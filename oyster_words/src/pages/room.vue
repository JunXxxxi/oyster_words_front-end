<template>
  <div id="root">
    <header>
      <h1>BATTLE ROOM</h1>
      <h2>对战房间</h2>
    </header>

    <div id="container" style="background-color: #98d4f3;height: 80vh">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="battle" class="panel_shadow">
        <el-page-header @back="quitRoom()" :content="title"></el-page-header>
        <div id="userInfo" style="margin-top: 10px" class="panel_shadow">
          <el-row style="height: 40px">
            <el-col id="hostFace" span="4">
              <el-badge :value="hostTag" class="item" type="primary">
                <el-avatar v-if="hostFaceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
                <el-avatar v-if="hostFaceId!==0" :size="40" fit="cover" :src="hostFaceURL"></el-avatar>
              </el-badge>
            </el-col>
            <el-col span="6">
              <el-row>
                <el-col span="24">{{hostName}}</el-col>
                <el-col span="24">
                  <el-tag class="hostScore" :type="hostStatusType">{{hostStatusText}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
            <el-col id="p" span="2">P</el-col>
            <el-col id="k" span="2">K</el-col>
            <el-col span="6">
              <el-row>
                <el-col style="text-align: right" span="24">{{guestName}}</el-col>
                <el-col style="text-align: right" span="24">
                  <el-tag class="hostScore" :type="guestTagType">{{guestStatusText}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
            <el-col style="text-align: right" id="guestFace" span="4">
              <el-badge :value="guestTag" class="item" :type="guestTagType">
                <el-avatar v-if="guestFaceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
                <el-avatar v-if="guestFaceId!==0" :size="40" fit="cover" :src="guestFaceURL"></el-avatar>
              </el-badge>
            </el-col>
          </el-row>
          <div v-if="IsUserHost==true" class="link">
            <p>邀请链接已经生成，邀请小伙伴一起玩吧</p>
            <el-row>
              <el-col span="24">
                <el-tag style="width: 100%;height: 50px;line-height:50px;border-radius: 10px">{{shareLink}}</el-tag>
              </el-col>
              <el-col style="margin-top: 10px" span="24">
                <el-button style="width: 100%;" size="small" round @click="copyLink(shareLink)">复制链接</el-button>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-button v-if="roomStatus===0" @click="quitRoom()" style="margin-top: 20px;width: 100%" type="danger" round>退出</el-button>
      </div>
    </div>

    <copyright></copyright>
  </div>
</template>

<script>
import copyright from "../components/footer/copyright";
import * as URL from "../global/interfaceURL";

export default {
  name: "room",
  components: {
    copyright,
  },

  data() {
    return {
      IsUserHost: false,
      roomId: 0,
      title:'房间号：',
      loopId: null,
      roomStatus: 0,
      shareLink:'http://localhost:8081/transfer_room?battleId=',
      //房主信息
      hostId: 0,
      hostName: "",
      hostScore: 0,
      hostFaceId: 0,
      hostFaceURL: "",
      hostStatus: 0,
      hostStatusText:'已就绪',
      hostStatusType:'',
      hostTag:'房主',
      hostTagType:'',

      //加入者信息
      guestId: 0,
      guestName: "[无玩家]",
      guestScore: 0,
      guestFaceId: 0,
      guestFaceURL: "",
      guestStatus: 0,
      guestStatusText:'未加入',
      guestStatusType:'',
      guestTag:'',
      guestTagType:'danger'
    }
  },
  created() {
    this.roomId = this.$route.query.roomId;
    this.IsUserHost = this.$route.query.userHost;
    this.shareLink = this.getShareLink()
    this.title += this.roomId
    this.dataInit();
  },
  mounted() {
    this.loop();

  },
  methods: {
    //初始化房间信息
    getShareLink(){
      let domain = window.location.href;
      if(domain.indexOf('localhost')!==-1){
        return this.shareLink +this.roomId
      }else{
        return 'http://oyster.q7w.cn/transfer_room?battleId=' +this.roomId
      }
    },
    dataInit(){
      this.$axios.get(URL.queryRoom, {params: {roomId: this.roomId}})
        .then((res) => {
          //初始化host的信息
          this.hostStatus = res.data.data.hostStatus;
          this.hostId = res.data.data.hostId;
          this.hostName = res.data.data.hostInfo.username;
          this.hostFaceId = res.data.data.hostInfo.faceId;
          this.hostScore = res.data.data.hostScore;
          this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";
          //初始化guest的信息
          this.guestStatus = res.data.data.guestStatus;
          this.guestId = res.data.data.guestId;
          this.guestName = res.data.data.guestInfo.username;
          this.guestFaceId = res.data.data.guestInfo.faceId;
          this.guestScore = res.data.data.guestScore;
          this.guestFaceURL = "../static/faces/f" + this.guestFaceId + ".jpg";

        })
    },
    //监听房间状态
    check() {
      this.$axios.get(URL.queryRoom, {params: {roomId: this.roomId}})
        .then((res) =>{
          //访客未加入时
          if (this.hostStatus === 1 && res.data.data.guestStatus === 0) {
            this.hostStatus = res.data.data.hostStatus;
            this.hostId = res.data.data.hostId;
            this.hostName = res.data.data.hostInfo.username;
            this.hostFaceId = res.data.data.hostInfo.faceId;
            this.hostScore = res.data.data.hostScore;
            this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";
          }
          //若host和guest都在房间则开始游戏
          if (this.hostStatus === 1 && res.data.data.guestStatus === 1) {
            //渲染host的信息
            this.hostStatus = res.data.data.hostStatus;
            this.hostId = res.data.data.hostId;
            this.hostName = res.data.data.hostInfo.username;
            this.hostFaceId = res.data.data.hostInfo.faceId;
            this.hostScore = res.data.data.hostScore;
            this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";
            //渲染guest的信息
            this.guestStatus = res.data.data.guestStatus;
            this.guestId = res.data.data.guestId;
            this.guestName = res.data.data.guestInfo.username;
            this.guestFaceId = res.data.data.guestInfo.faceId;
            this.guestScore = res.data.data.guestScore;
            this.guestFaceURL = "../static/faces/f" + this.guestFaceId + ".jpg";
            clearInterval(this.loopId);
            this.roomStatus = 1;
            this.$router.push({
              path:'/battle',
              name:'生蚝单词-对战',
              query:{
                roomId:this.roomId,
              },
              params:{
                hostId:this.hostId,
                hostFaceUrl:this.hostFaceURL,
                hostName:this.hostName,
                hostFaceID:this.hostFaceId,
                guestId:this.guestId,
                guestFaceUrl:this.guestFaceURL,
                guestName:this.guestName,
                guestFaceId:this.guestFaceId,
              },
            });
          }
        })

    },
    //循环监听用户加入房间
    loop() {
      if(this.roomStatus===0){
        this.check();
        //每0.5s向服务器获取guest的数据
        this.loopId = setInterval(this.check, 500);
      }
    },

    //退出房间
    quitRoom() {
      this.$confirm('现在离开该房间会销毁，无法再进入，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(URL.quitRoom, {params: {roomId: this.roomId}})
          .then((res) => {
            let code = res.data.respCode;
            switch(code) {
              case 1:
                clearInterval(this.loopId);
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push('/index');
                break;
              default:
                this.$message.error("系统异常");
                break;
            }
          })
      }).catch(() => {

      });

    },
    copyLink(content){
      let aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$message.success('链接'+content+'已复制')
    }
  }
}
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Sniglet|Raleway:900);
  html,body{
    overflow: hidden !important;
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
    display: inline;
    font-size: 1.5em;
    padding: 20px;
    line-height: 40px;
  }

  #content {
    left: 50%;
    background: white;
    top:70%;
    transform: translate(-50%,-50%);
    width:450px;
    position: absolute;
    transition: all ease-in-out 0.3s;
    height:max-content;
    box-shadow:0 5px 20px rgba(0,0,0,0.07);
    opacity:1;
    border-radius:20px;
  }
  #user {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px;
  }

  #question {
    background-color: white;
    height: 300px;
    width: 300px;
    margin: 60px auto;
    opacity: 0.8;
  }
  #selectItem{
    display: flex;
    flex-direction: column;
  }
  #battle{
    position: absolute;
    background: #fafafa;
    width: 400px;
    margin-left:50%;
    transform: translateX(-50%);
    top:30%;
  }
  #hostFace >>> .el-badge__content.is-fixed{
    top: 40px;
    right: 39px;
    text-align: center;
    user-select: none;
    width: 24px;
  }
  #guestFace >>> .el-badge__content.is-fixed{
    top: 40px;
    right: 40px;
    user-select: none;
    text-align: center;
    width: 24px;
  }
  #userInfo >>> .el-col{
    font-family: 'Raleway', sans-serif;
  }
  .userInfo >>> .el-col{
    font-family: 'Raleway', sans-serif;
  }
  #userInfo{
    height: max-content;
    margin-top:20px;
    background:white;
  }
  #p,#k{
    font-size: 48px;
    line-height: 40px;
    text-align: center;
    color:white;
    -webkit-text-stroke:3px #f90;
    text-shadow: 3px 3px black;
    user-select: none;
  }
  #p{
    transform:skewX(15deg);
  }
  #k{
    transform:skewX(-15deg);
  }
  #battle >>> .el-page-header__content{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
  }
  .link{
    margin-top: 50px;
  }
  .link p{
    margin:10px 0;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
