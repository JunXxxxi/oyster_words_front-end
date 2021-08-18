<template>
  <div id="container">

    <header>
      <h1>OYSTER</h1>
      <h2>邀请对战</h2>
      <h3></h3>
    </header>

    <div id="form" style="background-color: #98d4f3;height: 80vh">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="panel" class="panel_shadow">
        <div id="login-panel">
          <el-row align="center">
            <el-col :span="24" align="center" style="margin-bottom: 20px">
              <h4 style="color: #409EFF">单词对战房间号：{{battleId}}</h4>
            </el-col>
            <el-col span="24" align="center">
              <p>{{transText}}</p>
            </el-col>
            <el-row>
              <el-col :span="10" :offset="2" class="mt-30" align="center" style="margin-bottom:10px;margin-left: 10px" >
                <el-button round type="primary" style="width:100%;" @click="goToLogin" :loading='loginLoading'>登陆/注册</el-button>
              </el-col>
              <el-col :span="10" :offset="2" class="mt-30" align="center" style="margin-bottom:10px;margin-left: 40px">
                <el-button round type="primary" style="width:100%;" @click="goToRoom" :loading='loginLoading'>匿名访问</el-button>
              </el-col>
            </el-row>
          </el-row>
          <el-alert
            type="warning"
            description="匿名进入将为您生成匿名信息，您的所有信息将不会保存"
            :closable="false">
          </el-alert>
        </div>

      </div>
    </div>
    <copyright> </copyright>
  </div>
</template>

<script>
  import Copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL";
  export default {
    name: "login",
    components: {Copyright},
    data() {
      let checkName = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('用户名不能为空'))
        }else {
          callback()
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        let pass1 = this.register_form.password
        if(pass1){
          if (value==='') {
            callback(new Error("请再次输入密码"))
          }else if (value!==pass1) {
            callback(new Error("两次输入密码不一致!"))
          }else {
            callback();
          }
        }else{
          callback(new Error("请输入您的密码"))
        }

      }
      return {
        battleId:0,
        id:0,
        loginLoading:false,
        regLoading:false,
        tabSelect:"first",
        transText:'好友邀您单词对战，选择方式加入房间',
        login_form: {
          username: '',
          password: '',
        },
        login_rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'change' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'change' },
          ]
        },
        register_form:{
          username:'',
          password:'',
          password2:'',
          faceid:0,
        },
        faceURL:"../static/faces/f1.jpg",
        register_rules: {
          username: [{required:true, validator: checkName, trigger: 'blur' },
            { min: 4,  message: '用户名至少为4位', trigger: 'blur' }
          ],
          password: [{ required:true,validator: validatePass, trigger: 'blur' },
            { min: 4,  message: '密码至少为4位', trigger: 'blur' }],
          password2: [{ required:true,validator: validatePass2, trigger: 'blur' }],
          faceid:[{ required:true, trigger: 'blur' }],
        },
      }
    },
    created() {
      this.battleId = this.$route.query.battleId
    },
    methods:{
      goToRoom(){
        let userdata;
        let uid;
        this.$axios.get(URL.getAnonymousId).then((res)=>{
          userdata = res.data.userInfo
          uid = userdata.userId
          localStorage.setItem("username",userdata.username)
          localStorage.setItem("score",userdata.score)
          localStorage.setItem("faceId",userdata.faceId)
          localStorage.setItem("userId",userdata.userId)
          localStorage.setItem("winCnt",userdata.winCnt)
          this.enterRoom(this.battleId,uid)
        })
      },
      goToLogin(){
        this.id=localStorage.getItem("userId");
        this.$router.push('/login?battleId='+this.battleId);
      },
      enterRoom(roomId,guestId) {
        this.$axios.get(URL.enterRoom, {params: {guestId: guestId, roomId: roomId}})
          .then((res) => {
            let code = res.data.respCode
            switch (code) {
              case 1:
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                });
                this.$router.push({
                  path:'/room',
                  query:{
                    roomId: roomId,
                  },
                  params:{
                    userIsHost:false,
                  },
                });
                break;
              case 2:
                this.$message.error(res.data.msg);
                this.loginLoading = false
                return null
                break;
              default:
                this.$message.error("进入房间失败，系统异常");
                this.loginLoading = false
                return null
                break;
            }
          })
      },
    }
  };
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Sniglet|Raleway:900);
  html,body{
    overflow: hidden !important;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
  #container{
    min-height: 100%;
    overflow: hidden;
  }
  #panel{
    left: 50%;
    background: white;
    top:55%;
    transform: translate(-50%,-50%);
    width:350px;
    position: absolute;
    transition: all ease-in-out 0.3s;
  }
  #login-panel >>> .el-tabs__item {
    width: 175px;
  }
  #login-panel >>> .el-tabs__item {
    width: 175px;
  }
  #login-panel >>> .el-input-number{
    width: 100%;
  }
  h1{
    font-weight: bold;
    font-size: 3.6em;
    font-family: 'Raleway', sans-serif;
    margin: 0 auto;
    margin-top: 30px;
    width: 500px;
    color: #F90;
    text-align: center;
  }
  h2{
    font-weight: 700;
    font-size: 2em;
    letter-spacing: 10px;
    margin: 0 auto;
    color: #F90;
    text-align: center;
  }
  h4{
    margin:0;
  }
  /* Animation webkit */
  @-webkit-keyframes myfirst
  {
    0% {
      margin-left: -235px;
      transform: scale(1.2);
    }
    90% {
      margin-left: 100%;
      transform: scale(1.0);
    }
    100% {
      margin-left: 100%;
    }
  }

  /* Animation */
  @keyframes myfirst
  {
    0% {margin-left: -235px}
    70% {margin-left: 100%;}
    100% {margin-left: 100%;}
  }

  .fish{
    background:url("../assets/fish.png");
    width: 235px;
    height: 104px;
    margin-left: -235px;
    position: absolute;
    animation: myfirst 12s;
    -webkit-animation: myfirst 12s;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    -webkit-animation-timing-function: ease-in-out;
  }

  #fish{
    top: 30%;
  }

  #fish2{
    top: 50%;
    animation-delay: 3s;
    -webkit-animation-delay: 3s;
  }

  #fish3{
    top: 80%;
    animation-delay: 8s;
    -webkit-animation-delay: 8s;
  }


  header{
    height: 160px;
    background: url('../assets/golf.png') repeat-x bottom;
  }

</style>

