<template>
  <div id="background" align="center">

    <el-dialog
      title="修改昵称"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <el-form label-position="left" ref="form">
        <el-form-item style="margin: 0" label="新昵称：" prop="newname">
          <el-input style="width:75%" v-model="newname" placeholder="请输入用户名"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" round>取 消</el-button>
          <el-button type="primary" @click="changeUserName()" round>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible_1 "
      width="400px"
      :before-close="handleClose">
      <el-row style="margin-bottom: 20px">
        <el-col span="4" :offset="3">旧密码:</el-col>
        <el-col span="13">
          <el-input placeholder="请输入密码" v-model="oldPSW" show-password></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="4" :offset="3">新密码:</el-col>
        <el-col span="13">
          <el-input placeholder="请输入密码" v-model="newPSW" show-password></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false" round>取 消</el-button>
        <el-button type="primary" @click="changePSW()" round>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible_2"
      width="400px"
      :before-close="handleClose">
      <el-row type="flex" justify="space-between">
        <el-col  :span="3">
          <el-avatar v-if="newfaceId===0" fit="cover" icon="el-icon-user-solid"></el-avatar>
          <el-avatar v-if="newfaceId!==0" fit="cover" :src="newfaceURL"></el-avatar>
        </el-col>
        <el-col   :span="5">
          <p v-if="newfaceId===0" style="height: 100%;margin: 0" >默认头像</p>
          <p v-if="newfaceId!==0" style="height: 100%;margin: 0">头像{{newfaceId}}</p>
        </el-col>
        <el-col :span="10">
          <el-input-number size="small" v-model="newfaceId" controls-position="right"  @change="selectFace(newfaceId)" :min="0" :max="20"></el-input-number>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible_2 = false" >取 消</el-button>
              <el-button type="primary" @click="changeUserface()">确 定</el-button>
      </span>
    </el-dialog>

    <header>
      <h1>MY INFO</h1>
      <h2>个人信息</h2>
    </header>

    <div id="form" style="background-color: #98d4f3;height: calc(100vh - 190px);">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="panel_selfInform" class="panel_shadow" align="center">
        <el-page-header @back="back()"></el-page-header>
        <div id="img" @click="dialogVisible_2= true">
          <el-avatar v-if="faceId===0" :size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
          <el-avatar v-if="faceId!==0" :size="100" fit="cover" :src="faceURL"></el-avatar>
        </div>
        <div>
          <el-row>
            <el-col span="24">
              <h3>UID：{{userId}}</h3>
            </el-col>
            <el-col span="24">
              <h3>昵称：{{username}}</h3>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px" type="flex" justify="space-between">
            <el-col span="12">
              <el-button style="width: 100%" @click="dialogVisible = true" size="large" round>修改昵称</el-button>
            </el-col>
            <el-col span="1">
            </el-col>
            <el-col span="12">
              <el-button style="width: 100%" @click="dialogVisible_1= true" size="large" round>修改密码</el-button>
            </el-col>
          </el-row>
          <el-col style="margin-top:20px" span="24">
            <el-button style="width: 100%" @click="goToLogin" size="large" type="danger" round>注销</el-button>
          </el-col>
         </div>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
  import copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL"
  export default {
    name: "self_information",
    components:{
      copyright
    },
    data(){
      return{
        userId:"",
        username:"",
        newname:"",
        newPSW:"",
        oldPSW:"",
        dialogVisible: false,
        dialogVisible_1:false,
        dialogVisible_2:false,
        faceId:0,
        newfaceId:0,
        newfaceURL:"../static/faces/f1.jpg",
        faceURL:"../static/faces/f1.jpg"
      };
    },
    created() {
      this.getUserdata()
    },
    methods: {
      goToLogin(){
        window.localStorage.clear()
        this.$router.push('/login')
      },
      getUserdata(){
        this.userId=localStorage.getItem("userId")
        this.username=localStorage.getItem("username")
        this.faceId=localStorage.getItem("faceId")
        this.faceURL="../static/faces/f"+this.faceId+".jpg"
      },
      changePSW(){
        let password=this.oldPSW  //获取input输入的旧密码
        let newPassword=this.newPSW//获取input输入的新密码
        this.$axios.post(URL.resetPassword, {
          username:this.username,
          password: password,
          newPassword:newPassword
          }).then((res)=>{
            if(newPassword!==password){
              this.$message({
                duration:2000,
                showClose:true,
                message: '修改成功',
                type: 'success'
              });
              this.dialogVisible_1 = false;
            }
            else{
              this.$message.error("修改失败")
              this.loginLoading = false
            }
          })
        },
        changeUserName() {
          let username = this.username
          this.$axios.get( URL.changeUsername+"?userId="+this.userId+"&username="+this.newname).then((res)=>{
            let code = res.data.respCode
            switch (code){
              case 1:
                this.$message({
                  duration:2000,
                  showClose:true,
                  message: res.data.msg,
                  type: 'success'
                });
                this.username = this.newname;
                localStorage.setItem("username",this.newname)
                this.dialogVisible = false;
                break;
              case 2:
                this.$message.error(res.data.msg)
                this.loginLoading = false
                break;
              default:
                this.$message.error("系统异常")
                this.loginLoading = false
                break;
            }
          })
          },
          //修改头像
          selectFace(id){
            if(id===undefined){
              this.newfaceId = 0
              this.$message.warning("头像id异常，已设置为默认头像")
              this.newfaceURL = "../static/faces/f"+id+".jpg"
            }else{
              this.newfaceURL = "../static/faces/f"+id+".jpg"
            }
          },
          changeUserface(){
            let faceId = this.newfaceId
            this.$axios.get( URL.changeFace+"?userId="+this.userId+"&faceId="+this.newfaceId).then((res)=>{
              let code = res.data.respCode
              switch (code){
                case 1:
                  this.$message({
                    duration:2000,
                    showClose:true,
                    message: res.data.msg,
                    type: 'success'
                  });
                  this.faceURL = this.newfaceURL;
                  localStorage.setItem("faceId",this.newfaceId)
                  this.dialogVisible_2 = false;
                  break;
                case 2:
                  this.$message.error(res.data.msg)
                  this.loginLoading = false
                  break;
                default:
                  this.$message.error("系统异常")
                  this.loginLoading = false
                  break;
              }
            })

          },
      back(){
        this.$router.go(-1);//返回上一层
      },

    },
  }
</script>
<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Sniglet|Raleway:900");
  #background >>> .el-dialog{
    border-radius: 20px;
    transition: all ease-in-out 0.3s;
    padding:10px;
  }
  #background >>> .el-dialog__title{
    font-size: 1.4em;
    font-weight: bold;
  }
  #background >>> .el-dialog__body{
    padding:30px
  }
  #panel_selfInform{
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:300px;
    height: max-content;
    position: absolute;
    transition: all ease-in-out 0.3s;
    background: rgba(255,255,255,0.98);
    border-radius: 15px;
    padding:30px;
  }
  #img{
    margin-top:20px;
    margin-bottom:20px;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
    width: max-content;
  }
  #img:hover{
    transform: scale(1.1);
    transition: all ease-in-out 0.3s;
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
  h3{
    font-weight: 700;
    font-size: 1.2em;
    margin: 0px;
    color: black;
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
