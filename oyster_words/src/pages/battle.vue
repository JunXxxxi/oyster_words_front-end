<template>
  <div id="main">
    <div id="gameover" v-if="gameOver">
      <div id="panel" class="panel_shadow">
        <p class="endTitle">GAME OVER</p>
        <p class="endTitle">{{overDesp}}</p>
        <div style="margin-top: 10px" class="panel_shadow userInfo">
          <el-row style="height: 40px">
            <el-col span="9">
              <el-row>
                <el-col style="text-align: center" span="24">{{hostInfo.hostName}}</el-col>
                <el-col style="text-align: center" class="hostFace" span="24">
                  <el-badge :value="hostTag" :type="hostTagType">
                    <el-avatar v-if="hostInfo.hostFaceId===0" :size="60" fit="cover" icon="el-icon-user-solid"></el-avatar>
                    <el-avatar v-if="hostInfo.hostFaceId!==0" :size="60" fit="cover" :src="hostInfo.hostFaceUrl"></el-avatar>
                  </el-badge>
                </el-col>
                <el-col  style="text-align: center"  span="24">
                  <el-tag  class="hostScore1" :type="hostScoreType">{{hostInfo.hostScore}}</el-tag>
                </el-col>
              </el-row>
            </el-col>

            <template  v-if="winner===0" >
              <el-col class="ping" span="3">平</el-col>
              <el-col class="ju" span="3">局</el-col>
            </template>
            <template  v-if="winner===1" >
              <el-col class="sheng" span="3">胜</el-col>
              <el-col class="fu" span="3">负</el-col>
            </template>
            <template  v-if="winner===2" >
              <el-col class="fu" span="3">负</el-col>
              <el-col class="sheng" span="3">胜</el-col>
            </template>

            <el-col span="9">
              <el-row>
                <el-col style="text-align: center" span="24">{{guestInfo.guestName}}</el-col>
                <el-col style="text-align: center" class="guestFace" span="24">
                  <el-badge :value="guestTag" :type="guestTagType">
                    <el-avatar v-if="guestInfo.guestFaceId===0" :size="60" fit="cover" icon="el-icon-user-solid"></el-avatar>
                    <el-avatar v-if="guestInfo.guestFaceId!==0" :size="60" fit="cover" :src="guestInfo.guestFaceUrl"></el-avatar>
                  </el-badge>
                </el-col>
                <el-col style="text-align: center" span="24">
                  <el-tag class="hostScore1" :type="guestScoreType">{{guestInfo.guestScore}}</el-tag>
                </el-col>
              </el-row>
            </el-col>

          </el-row>
        </div>
        <el-button style="width: 100%;margin-top: 20px" round @click="goHome">返回主页</el-button>
      </div>
    </div>
    <header>
      <h1>Battle</h1>
      <h2>对战房间</h2>
    </header>
    <div id="form" style="background-color: #98d4f3;height: 115vh;width: 100vw">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="battle" class="panel_shadow">
        <el-page-header @back="goBack()" :content="title"></el-page-header>
        <div id="userInfo" style="margin-top: 10px" class="panel_shadow">
          <el-row style="height: 40px">
            <el-col id="hostFace" span="4">
              <el-badge :value="hostTag" class="item" :type="hostTagType">
                <el-avatar v-if="hostInfo.hostFaceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
                <el-avatar v-if="hostInfo.hostFaceId!==0" :size="40" fit="cover" :src="hostInfo.hostFaceUrl"></el-avatar>
              </el-badge>
            </el-col>
            <el-col span="6">
              <el-row>
                <el-col span="24">{{hostInfo.hostName}}</el-col>
                <el-col span="24">
                  <el-tag class="hostScore" :type="hostScoreType">{{hostInfo.hostScore}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
            <el-col id="p" span="2">P</el-col>
            <el-col id="k" span="2">K</el-col>
            <el-col span="6">
              <el-row>
                <el-col style="text-align: right" span="24">{{guestInfo.guestName}}</el-col>
                <el-col style="text-align: right" span="24">
                  <el-tag class="hostScore" :type="guestScoreType">{{guestInfo.guestScore}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
            <el-col style="text-align: right" id="guestFace" span="4">
              <el-badge :value="guestTag" class="item" :type="guestTagType">
                <el-avatar v-if="guestInfo.guestFaceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
                <el-avatar v-if="guestInfo.guestFaceId!==0" :size="40" fit="cover" :src="guestInfo.guestFaceUrl"></el-avatar>
              </el-badge>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="9">
              <el-progress style="width: 120%" :percentage="hostQid*10" :format="processFormat" :color="hostProcessType"></el-progress>
            </el-col>

            <el-col span="9" :offset="6">
              <el-progress style="width: 120%" :percentage="guestQid*10" :format="processFormat" :color="guestProcessType"></el-progress>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 10px" class="panel_shadow">
          <h4 v-if="questionList[qid].action==='fill'">{{qid+1}}/10 选择正确的字母以补全单词</h4>
          <h4 v-if="questionList[qid].action==='tr'">{{qid+1}}/10 英汉互译</h4>
          <el-progress style="width: 100%;margin-bottom: 10px;margin-top: 5px" :stroke-width="20" :text-inside="true" :percentage="TimeLeft" :format="format" :color="customColors"></el-progress>

          <div id="qDesc">
            <p id="descEN">{{questionList[qid].desp}}</p>
            <p id="descCN" v-if="questionList[qid].action==='fill'">{{questionList[qid].chinese}}</p>
          </div>
          <el-row>
            <el-col style="margin-bottom: 15px" span="24">
              <el-button class="button" style="width: 100%" :type="btnStyle.A" round @click="checkAnswer('A')" :disabled="choseDisable">{{questionList[qid].choices[0]}}</el-button>
            </el-col>
            <el-col style="margin-bottom: 15px" span="24">
              <el-button class="button" style="width: 100%" :type="btnStyle.B" round @click="checkAnswer('B')" :disabled="choseDisable">{{questionList[qid].choices[1]}}</el-button>
            </el-col>
            <el-col style="margin-bottom: 15px" span="24">
              <el-button class="button" style="width: 100%" :type="btnStyle.C" round @click="checkAnswer('C')" :disabled="choseDisable">{{questionList[qid].choices[2]}}</el-button>
            </el-col>
            <el-col span="24">
              <el-button class="button" style="width: 100%" :type="btnStyle.D" round @click="checkAnswer('D')" :disabled="choseDisable">{{questionList[qid].choices[3]}}</el-button>
            </el-col>
          </el-row>
        </div>
        <el-alert
          style="margin-top: 10px"
          title="游戏规则"
          close-text="知道了"
          type="info"
          description="每局10题，每题限时10秒；超时/答错不加分；谁先挑战完就结束">
        </el-alert>
      </div>

    </div>
  </div>
</template>

<script>
  import copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL";
  export default {
    name: "battle",
    components:{
      copyright
    },
    data(){
      return{
        roomId:0,
        title:"房间号：",
        winner:0,
        IsUserHost:false,
        TimeLeft:100,
        overDesp:'',
        loopTimeId:0,
        loopScoreId:0,
        roomStatus:0,
        gameOver:false,

        hostTag:"我",
        hostTagType:'primary',
        hostScoreType:'',
        hostProcessType:'#409eff',
        hostQid:0,

        guestTag:'对方',
        guestTagType:'',
        guestScoreType:'danger',
        guestProcessType:'#f56c6c',
        guestQid:0,

        hostInfo:{
          hostId:0,
          hostFaceId:0,
          hostFaceUrl:"../static/faces/f1.jpg",
          hostName:"Host",
          hostScore:0,
        },
        guestInfo:{
          guestId:0,
          guestFaceId:0,
          guestFaceUrl:"../static/faces/f1.jpg",
          guestName:"Guest",
          guestScore:0,
        },
        qid:0,
        choseDisable:false,
        questionList:[
          {
            desp:"Y_llow",
            chinese:"黄色",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Appl_",
            chinese:"苹果",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Whit_",
            chinese:"白色",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Y_llow",
            chinese:"黄色",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Appl_",
            chinese:"苹果",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Whit_",
            chinese:"白色",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Y_llow",
            chinese:"黄色",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Appl_",
            chinese:"苹果",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Whit_",
            chinese:"白色",
            answer:"A",
            choices:['e','b','c','d']
          },
          {
            desp:"Whit_",
            chinese:"白色",
            answer:"A",
            choices:['e','b','c','d']
          },
        ],
        btnStyle:{
          "A":"",
          "B":"",
          "C":"",
          "D":"",
        },
        customColors: [
          {color: '#f56c6c', percentage: 40},
          {color: '#e6a23c', percentage: 70},
          {color: '#5cb87a', percentage: 100},
        ]
      }
    },
    created() {
      this.roomId = this.$route.query.roomId
      this.title += this.roomId
      this.hostInfo.hostId = this.$route.params.hostId
      this.hostInfo.hostName = this.$route.params.hostName
      this.hostInfo.hostFaceId = this.$route.params.hostFaceId
      this.hostInfo.hostFaceUrl = this.$route.params.hostFaceUrl

      this.guestInfo.guestId = this.$route.params.guestId
      this.guestInfo.guestName = this.$route.params.guestName
      this.guestInfo.guestFaceId = this.$route.params.guestFaceId
      this.guestInfo.guestFaceUrl = this.$route.params.guestFaceUrl
      this.initData()
    },
    mounted() {
      this.loopCountDown()
      this.loopGetScore()
    },
    methods:{
      initData(){
        if(this.hostInfo.hostId===undefined || this.hostInfo.hostId=== null || this.hostInfo.hostId===''){
          this.$message.error("房间数据错误")
          this.$router.push('/index')
        }else{
          let userId = localStorage.getItem('userId')
          this.IsUserHost = (userId == this.hostInfo.hostId)
          this.getQuesiton()
          //判断身份
          if(this.IsUserHost){
          }else{
            this.hostTag = "对方"
            this.hostTagType = ""
            this.hostScoreType='danger'
            this.hostProcessType = '#f56c6c'
            this.guestTag = "我"
            this.guestTagType = "primary"
            this.guestScoreType = ""
            this.guestProcessType = '#409eff'
          }
        }

      },
      getQuesiton(){
        this.$axios.get(URL.getQuestions, {params: {roomId: this.roomId}})
          .then((res) =>{
            this.questionList = res.data.data
          })
      },
      getScore(){
        this.$axios.get(URL.refreshBattle, {params: {id: this.roomId}})
          .then((res) =>{
            let roomStatus = res.data.roomStatus;
            if(roomStatus === -1){
              this.$message.error("房间状态异常")
              this.TimeLeft = 0
              clearInterval(this.loopTimeId)
              clearInterval(this.loopScoreId)
              this.router.push('/index')
              return null
            }else if(roomStatus === -3){
              this.$message.warning("游戏已结束")
              this.endGame()
              return null
            }

            this.hostInfo.hostScore = res.data.creatorCredits;
            this.guestInfo.guestScore = res.data.guestCredits;
            this.hostQid = res.data.creatorQuestionIndex;
            this.guestQid = res.data.guestQuestionIndex;

          })
      },
      loopGetScore(){
        this.loopScoreId  = setInterval(this.getScore,500)
      },
      countDown(){
        if(this.TimeLeft>0){
          this.TimeLeft -= 10
          if(this.TimeLeft === 0){
            let answer = this.questionList[this.qid].answer
            this.btnStyle[answer] = "warning"
            this.sleep(1000).then(() => {
              if(this.qid<9){
                this.qid+=1
                let uid = localStorage.getItem('userId')
                let score = 0
                if(this.IsUserHost){
                  score = this.hostInfo.hostScore
                }else{
                  score = this.guestInfo.guestScore
                }
                this.updateScore(uid,score)
                this.TimeLeft = 100
                this.btnStyle = ['','','','']
              }else{
                this.TimeLeft = 0
                this.endGame()
                return null;
              }
            })
          }
        }
        else{
          if(this.gameOver){
            this.TimeLeft = 0
            return null;
          }else{
            this.TimeLeft = 100
          }
        }
      },
      loopCountDown(){
        this.loopTimeId = setInterval(this.countDown,1000)
      },
      format(TimeLeft) {
        return `${TimeLeft/10}秒`;
      },
      processFormat(qid){
        return `${qid/10}/10`;
      },
      checkAnswer(chose){
        let answer = this.questionList[this.qid].answer
        clearInterval(this.loopTimeId)
        this.btnStyle = ['','','','']
        if(answer===chose){
          this.btnStyle[chose] = "success"
          // this.$message.success("回答正确")
          let uid = localStorage.getItem('userId')
          let score = 0
          let newscore = 110+this.TimeLeft/10
          if(this.IsUserHost){
            score = this.hostInfo.hostScore
            score += newscore
          }else{
            score = this.guestInfo.guestScore
            score += newscore
          }
          this.updateScore(uid,score)

          this.sleep(500).then(() => {
            if(this.qid<9){
              this.qid+=1
            }else{
              this.TimeLeft = 0
              this.endGame()
              return null;
            }
            this.btnStyle = ['','','','']
            this.TimeLeft = 100
            this.loopCountDown()
          })
        }else{
          this.btnStyle[chose] = "danger"
          this.btnStyle[answer] = "success"
          let uid = localStorage.getItem('userId')
          let score = 0
          if(this.IsUserHost){
            score = this.hostInfo.hostScore
          }else{
            score = this.guestInfo.guestScore
          }
          this.updateScore(uid,score)

          this.sleep(500).then(() => {
            if(this.qid<9){
              this.qid+=1
            }else{
              this.TimeLeft = 0
              this.endGame()
              return null;
            }
            this.btnStyle = ['','','','']
            this.TimeLeft = 100
            this.loopCountDown()
          })
        }
      },
      updateScore(uid,score){
        this.$axios.get(`${URL.credit}?user=${uid}&battle=${this.roomId}&total=${score}`)
          .then((res) => {
            if(res.data.respCode ===1){
              // this.$message.success('成绩提交成功')
            }
          })
      },
      updateGame(){
        let uid = localStorage.getItem('userId')
        this.$axios.get(`${URL.saveScore}?id=${uid}&battleId=${this.roomId}`)
          .then((res) => {
            if(res.data.respCode ===1){
              // this.$message.success('提交成功')
          }
        })
      },
      quitGame(){
        let uid = localStorage.getItem('userId')
        this.$axios.get(`${URL.saveScore}?id=${uid}&battleId=${this.roomId}`)
          .then((res) => {
            if(res.data.respCode ===1){
              // this.$message.success('提交成功')
            }
          })
      },
      sleep(time){
        return new Promise((resolve) => setTimeout(resolve, time));
      },
      endGame(){
        this.updateGame()
        this.$axios.get(URL.refreshBattle, {params: {id: this.roomId}})
          .then((res) =>{
            this.hostInfo.hostScore = res.data.creatorCredits;
            this.guestInfo.guestScore = res.data.guestCredits;
          })
        this.gameOver = true
        this.TimeLeft = 0
        clearInterval(this.loopTimeId)
        clearInterval(this.loopScoreId)
        if(this.hostInfo.hostScore === this.guestInfo.guestScore){
          this.winner = 0
          this.overDesp = '游戏结束'
        }else if(this.hostInfo.hostScore > this.guestInfo.guestScore){
          this.winner = 1
          if(this.IsUserHost){
            this.overDesp = '您获胜了！'
          }else{
            this.overDesp = '您失败了，再接再厉'
          }
        }else{
          this.winner = 2
          if(this.IsUserHost){
            this.overDesp = '您失败了，再接再厉'
          }else{
            this.overDesp = '您获胜了！'
          }
        }
      },
      goHome(){
        this.$router.push('/index')
      },
      goBack(){
        this.$confirm('游戏中离开会将无法再次进入，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'warning',
            message: '您已离开房间，本场游戏失败'
          });
          this.updateGame()
          clearInterval(this.loopTimeId)
          clearInterval(this.loopScoreId)
          this.TimeLeft = 0
          this.$router.push('/index')

        }).catch(() => {

        });
      }
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Sniglet|Raleway:900");
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
  h5{
    font-family: 'Raleway', sans-serif;
    text-align: center;
    color: #F90;
    margin: 0;
  }
  h4{
    margin:  0;
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
    height: 140px;
    background: url('../assets/golf.png') repeat-x bottom;
  }
  #battle{
    background: #fafafa;
    width: 400px;
    margin-left:50%;
    transform: translateX(-50%);
    top:22%;
  }
  #qDesc{
    background: #f9f9f9;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    margin-bottom: 20px;
  }
  #descCN,#descEN{
    color:#639b61;
    letter-spacing: 5px;
    font-weight: 700;
    font-family: 'Raleway', sans-serif;
    font-size: 24px;
  }
  .button{
    font-size: 18px;
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
    transition: all ease-in-out 0.3s;
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
  .userInfo{
    height: 130px;
  }
  .hostScore{
    margin-top: 2px;
    width: 60px;
    text-align: center;
    border-radius: 30px;
    font-size: 18px;
  }
  .hostScore1{
    margin-top: 10px;
    height: max-content;
    width: max-content;
    padding: 5px 15px;
    min-width: 100px;
    text-align: center;
    border-radius: 30px;
    font-size: 30px;
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
  #gameover{
    top:0;
    right: 0;
    z-index: 100;
    position: absolute;
    width: 100vw;
    height:100vh;
    background: #00000090;
    backdrop-filter: blur(5px);
  }
  #panel{
    position: absolute;
    background: #fafafa;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: max-content;
  }
  .endTitle{
    font-family:Raleway;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color:#f90;
    margin:0;
  }
  .ping{
    font-size: 40px;
    font-weight: 900;
    line-height: 130px;
    text-align: center;
    color:#777777;
    transform:skewX(5deg);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    user-select: none;
  }
  .ju{
    font-size: 40px;
    font-weight: 900;
    line-height: 130px;
    text-align: center;
    color:#777777;
    transform:skewX(-5deg);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    user-select: none;
  }
  .hostFace >>> .el-badge__content.is-fixed{
    top: 55px;
    right: 48px;
    text-align: center;
    user-select: none;
    width: 24px;
  }
  .guestFace >>> .el-badge__content.is-fixed{
    top: 55px;
    right: 48px;
    text-align: center;
    user-select: none;
    width: 24px;
  }
  .sheng{
    font-size: 40px;
    font-weight: 900;
    line-height: 130px;
    text-align: center;
    color:red;
    transform:skewX(5deg);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    user-select: none;
  }
  .fu{
    font-size: 40px;
    font-weight: 900;
    line-height: 130px;
    text-align: center;
    color:#777777;
    transform:skewX(-5deg);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    user-select: none;
  }
</style>
