<template>
  <div align="center">
    <header>
      <h1>Rank</h1>
      <h2>排行榜</h2>
    </header>
    <div id="form" style="background-color: #98d4f3;height:105vh;width:100vw">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="ranking_list">
        <div id="list" class="panel_shadow">
          <el-page-header @back="back()"></el-page-header>
          <div id="my_score" class="panel_shadow">
            <table style="width: 100%">
              <tr id="tr1">
                <td id="td1_1">我的<br>成绩</td>
                <td id="td1_2">
                  <el-avatar v-if="faceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
                  <el-avatar v-if="faceId!==0" :size="40" fit="cover" :src="faceURL"></el-avatar>
                </td>
                <td id="td1_3">{{myname}}</td>
                <td id="td1_4">第{{myrank}}名</td>
                <td id="td1_5">{{myscore}}分</td>
              </tr>
            </table>
          </div>
          <table style="margin-top: 10px;margin-left: -30px;margin-bottom:10px">
            <thead>
              <tr>
                <td id="td2_1">排名</td>
                <td id="td2_2">头像</td>
                <td id="td2_3">昵称</td>
                <td id="td2_4">分数</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in rankData">
                <td id="td3_1">
                  <el-image style="height: 30px;width: 30px;" v-if="index >= 0 && index <= 2" fit="cover" :src=get_rankImageURL(index)></el-image>
                  <el-avatar  size="small" v-if="index >= 3">{{index+1}}</el-avatar>
                </td>
                <td id="td3_2">
                  <el-avatar v-if="item.faceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
                  <el-avatar v-if="item.faceId!==0" :size="40" fit="cover" :src="faceList[index]"></el-avatar>
                </td>
                <td id="td3_3">
                  <p class="username">{{item.username}}</p>
                </td>
                <td id="td3_4">
                  <p class="userscore">{{item.score}}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <copyright style="color: #AAAAAA;width:100%"></copyright>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL";
  export default {
    name: "ranking_list",
    components:{
      copyright
    },
    data(){
      return{
        userId:1,
        faceId:1,
        faceURL:"../static/faces/f1.jpg",
        myname:"",
        myrank:1,
        myscore:1,
        rankData: [],
        faceList:[],
        rankImageURL:""
      }
    },
    created() {
      this.get_UserInfor()
      this.get_Rank()
    },
    mounted() {
    },
    methods:{
      get_rankImageURL(index){
        let num = index + 1;
        this.rankImageURL = "../static/ranks/r"+num+".png";
        return this.rankImageURL;
      },
      get_UserInfor(){
        this.userId = localStorage.getItem("userId");
        this.faceId = localStorage.getItem("faceId");
        this.myname = localStorage.getItem("username");
        this.faceURL = "../static/faces/f"+this.faceId+".jpg"
      },
      get_Rank(){
        var _this = this;
        this.$axios.get(URL.getRank+"?userId="+this.userId)
          .then((res)=>{
            let rank = res.data.yourRank.rank
            this.myname = res.data.yourRank.data.username
            this.myscore = res.data.yourRank.data.score
            if(rank){
              this.myrank = rank
              this.rankData = res.data.allRank
              for(let i=0;i<10;i++){
                this.faceList[i]="../static/faces/f"+this.rankData[i].faceId+".jpg"
              }
            }else {
              this.$message.error("系统异常")
            }
        })
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Sniglet|Raleway:900");
  img{
    user-select: none;
  }
  thead td{
    font-weight: bold;
    font-size: 14px;
    color:#aaaaaa
  }
  #my_score{
    width: auto;
    background: white;
    padding: 10px;
    height: max-content;
    border-radius: 20px;
    margin-top: 20px;
  }
  #tr1{
    line-height: 20px;
    height: 40px;
  }
  #td1_1{
    font-weight: bold;
    text-align: center;
    line-height: 20px;
    height: 40px;
    width: 50px;
    color: #F90;
  }
  #td1_2{
    text-align: center;
    line-height: 20px;
    height: 40px;
    width: 70px;
  }
  #td1_3{
    line-height: 20px;
    height: 40px;
    font-family: 'Raleway', sans-serif;
    width:100px;
  }
  #td1_4{
    font-weight: bold;
    line-height: 20px;
    height: 40px;
    width: 100px;
    color: #F90;
  }
  #td1_5{
    font-weight: bold;
    text-align: center;
    line-height: 20px;
    height: 40px;
    width: 80px;
    color: #F90;
  }
  #list{
    position: absolute;
    left: 50%;
    top:21%;
    transform: translate(-50%);
    padding: 20px;
    width: 410px;
    height: max-content;
    border-radius: 20px;
    background: white;
  }
  #td2_1,#td3_1{
    width: 75px;
    text-align: center;
  }
  #td2_2{
    width: 40px;
    text-align: left;
  }
  #td3_2{
    width: 50px;
    text-align: left;
  }
  #td2_3,#td3_3{
    width: 230px;
    text-align: left;
    font-family: 'Raleway', sans-serif;
  }
  #td2_4,#td3_4{
    width: 50px;
    text-align: center;
    font-family: 'Raleway', sans-serif;
  }
  #td3_4{
    color: #F90;
    font-size: 18px;
  }
  #td3_4 p{
    margin: 0;
  }
  #td3_1 >>> .el-avatar{
    user-select: none;
    color: #9f9f9f;
    background-color: #f5f5f5;
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
  .username{
    font-size: 16px;
    font-weight: bold;
  }
</style>
