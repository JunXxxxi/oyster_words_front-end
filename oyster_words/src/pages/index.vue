<template>
  <div id="root">
    <header>
      <h1>HOME PAGE</h1>
      <h2>首页</h2>
    </header>
    <div id="container" style="background-color: #98d4f3;height: calc(100vh - 190px)">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="panel_selfInform" class="panel_shadow" align="center">
        <el-tag size="small" style="border-radius: 50px;position: absolute" type="warning">UID：{{userId}}</el-tag>
        <div id="img">
          <el-avatar v-if="faceId===0" :size="70" fit="cover" icon="el-icon-user-solid"></el-avatar>
          <el-avatar v-if="faceId!==0" :size="70" fit="cover" :src="faceURL"></el-avatar>
        </div>
        <div>
          <el-row>
            <h3>{{username}}</h3>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col span="12">
              <el-row>
                <el-col>
                  <el-badge value="总分" class="item" type="warning">
                    <div class="win" >{{score}}</div>
                  </el-badge>
                </el-col>

              </el-row>

            </el-col>
            <el-col span="12">
              <el-row>
                <el-col span="24">
                  <el-badge value="胜场" class="item" type="warning">
                  <div class="win" >{{winCnt}}</div>
                  </el-badge>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row id="content">
        <el-col span="12">
          <el-button id="btn1" class="btn1" @click="createRoom()"></el-button>
        </el-col>
        <el-col span="12">
          <el-button id="btn2" class="btn1" @click="open()"></el-button>

        </el-col>
        <el-col span="12">
          <el-button id="btn3" class="btn1" @click="self()"></el-button>

        </el-col>
        <el-col span="12">
          <el-button id="btn4" class="btn1" @click="rankList()"></el-button>
        </el-col>
      </el-row>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import copyright from "../components/footer/copyright";
import * as URL from "../global/interfaceURL";

export default {
  name: "index",
  components: {
    copyright,
  },
  data() {
    return {
      userId: 0,
      username: "NULL",
      winCnt: 0,
      faceId: 0,
      score: 0,
      faceURL:"../static/faces/f1.jpg",
    }
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    //获得用户信息
    getUserData() {
      this.userId = localStorage.getItem("userId");
      this.$axios.get(URL.getAllMyInfo+'?userId='+this.userId)
        .then((res) => {
          let code = res.data.respCode
          let userInfo  = res.data.userInfo
          this.username = userInfo.username
          this.winCnt = userInfo.winCnt
          this.score = userInfo.score
          this.faceId = userInfo.faceId
          this.faceURL = "../static/faces/f"+this.faceId+".jpg";
          localStorage.setItem("username",this.username);
          localStorage.setItem("winCnt",this.winCnt);
          localStorage.setItem("score",this.score);
          localStorage.setItem("faceId",this.faceId);
        })

    },
    //创建房间
    createRoom() {
      this.$axios.get(URL.createRoom, {params: {hostId: this.userId}})
        .then((res) => {
          let code = res.data.respCode
          switch (code) {
            case 1:
              let roomId = res.data.roomId;
              this.$message({
                message: '房间（ID'+roomId+'）创建成功',
                type: 'success'
              });
              this.$router.push({
                path:'/room',
                name:'生蚝单词-房间',
                query: {
                  roomId: roomId,
                  userHost:true,
                }
              });
              break;
            default:
              this.$message.error("系统异常");
              break;
          }
        })
    },
    //进入房间
    enterRoom(roomId) {
      this.$axios.get(URL.enterRoom, {params: {guestId: this.userId, roomId: roomId}})
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
              });
              break;
            case 2:
              this.$message.error(res.data.msg);
              break;

            default:
              this.$message.error("系统异常");
              break;
          }
        })
    },
    //进入房间提示框（输入房间号）
    open() {
      this.$prompt('请输入房间号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(({value}) => {
        this.enterRoom(value);
      })
    },
    //进入排行榜
    rankList(){
      this.$router.push('/ranking_list');
    },
    //个人信息
    self(){
      this.$router.push('/self_information');
    }
  }
}

</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Sniglet|Raleway:900);
  html,body{
    overflow: hidden !important;
  }
  img{
    user-select: none!important;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
  #root  {
    min-height: 100%;
    overflow: hidden;
    text-align: center;
  }
  header{
    height: 160px;
    background: url('../assets/golf.png') repeat-x bottom;
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
    font-weight: bolder;
    font-size: 1.2em;
    letter-spacing: 3px;
    margin: 0;
    vertical-align: bottom;
    color: black;
    font-family: 'Raleway', sans-serif;
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

  #header_bar {
    left: 50%;
    background: white;
    top:40%;
    transform: translate(-50%,-50%);
    width:450px;
    position: absolute;
    transition: all ease-in-out 0.3s;
    height:max-content;
    box-shadow:0 5px 20px rgba(0,0,0,0.07);
    opacity:1;
    border-radius:20px;
  }

  #header_bar p {
    font-size: 1.3em;
    padding: 0;
    margin: 0;
  }

  #content {
    left: 50%;
    background: #F6F7F9;
    top:66%;
    transform: translate(-50%,-50%);
    width:420px;
    position: absolute;
    transition: all ease-in-out 0.3s;
    height:max-content;
    box-shadow:0 5px 20px rgba(0,0,0,0.07);
    opacity:1;
    border-radius:20px;
    padding: 90px 20px 20px 20px;
    border: 5px white solid;
  }

  .btn1 {
    height: 90px;
    margin: 10px;
    width: 170px;
    display: inline-block;
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
    border-width: 0;
  }
  .btn1:hover{
    transition: all ease-in-out 0.3s;
    transform: scale(1.05);
    box-shadow: 0 0 15px #00000010;
  }
  #panel_selfInform{
    left: 50%;
    top:39%;
    transform: translate(-50%,-50%);
    width:400px;
    height: max-content;
    position: absolute;
    transition: all ease-in-out 0.3s;
    background: rgba(255,255,255,0.98);
    border-radius: 15px;
    z-index: 99;
  }
  #img{
    margin-top:10px;
    margin-bottom:20px;
    transition: all ease-in-out 0.3s;
    width: max-content;
    user-select: none;
  }
  #img:hover{
    transform: scale(1.05);
    transition: all ease-in-out 0.3s;
  }
  #panel_selfInform >>> .el-tag{
    right: 50%;
    transform: translateX(50%);
    top:85px;
    z-index: 120;
  }
  .win{
    width: 180px;
    background-color: #fef0f0;
    border-width: 2px;
    border-color: #fde2e2;
    border-style: solid;
    border-radius: 50px;
    color: #f56c6c;
    font-family: 'Raleway', sans-serif;
    padding: 5px 0 10px 0;
    font-size: 28px;
    user-select: none;
    transition: all ease-in-out 0.3s;
  }
  .win:hover{
    transition: all ease-in-out 0.3s;
    background-color: #ffe0e0;
  }
  #panel_selfInform >>>.el-badge__content.is-fixed{
    right: 40px;
    background-color:gold;
    color: #5a5a5a;
    user-select: none;
  }
  #content:hover{
    transform: translate(-50%, -45%);
  }
  #btn1{
    background: url("../assets/1.png");
    background-size: cover;
  }
  #btn2{
    background: url("../assets/2.png");
    background-size: cover;
  }
  #btn3{
    background: url("../assets/3.png");
    background-size: cover;
  }
  #btn4{
    background: url("../assets/4.png");
    background-size: cover;
  }

</style>
