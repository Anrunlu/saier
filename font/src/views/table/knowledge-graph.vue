<template>
  <div>
    <!-- <div class="top-info">
      <search id="mySearch" ref="search" v-model="searchValue" position="absolute" top="0px" placeholder="请输入关键字" @on-cancel="onCancel" @on-submit="onSubmit" />
    </div> -->
    <div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item" @change="coureschange">{{ item }}</el-radio>
      </el-radio-group>

    </div>

    <div style="width: 100%;height:100%;position:fixed ">
      <el-input v-model="searchTerm" style="width:30%" placeholder="请填写要查找的知识点" class="handle-input mr10" />
      <el-button icon="el-icon-edit" type="primary" @click="findInfoByTerm">查询知识点</el-button>
      <el-button icon="el-icon-edit" type="warning" @click="singleKnowledge">{{ showModel }}</el-button>

      <div id="myChart" style="width: 100%;height:500px;position:fixed" />
      <div style="width: 100%;height:50%;position:absolute">
        <el-button v-show="updateflag" icon="el-icon-edit" type="danger" @click="changeGloss">确认修改知识点介绍</el-button>
        {{ knowname }}
        <mavon-editor ref="md" v-model="kngloss" @imgAdd="$imgAdd" />

      </div>
    </div>

  </div>
</template>

<script>

import echarts from 'echarts'
import { mavonEditor } from 'mavon-editor'
import { kginfobyterm, kginfobycid, changekngloss, recKnImg } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'
//  // 引入基本模板
// let echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')

export default {
  name: 'Home',
  components: {
    mavonEditor
  },
  data() {
    return {

      conid: '',
      searchTerm: '',
      selcoures: '',
      coures: [],
      knowname: '',
      singleMulti: false,
      showModel: '单知识点模式',
      kngloss: '### 请点击图谱中的知识点，查看知识点内容介绍',
      updateflag: false,
      searchValue: '', // 搜索框内容
      option: {
        backgroundColor: '#2c343c',
        title: {
          text: '图谱',
          subtext: '',
          top: 'top',
          left: 'center'
        },
        tooltip: {

        },
        

        legend: [{
          // selectedMode: 'single',
          // data: categories.map(function (a) {
          //    return a.name;
          // })
        }],
        animation: false,
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '',
            type: 'graph',
            layout: 'force',
            draggable: true,
            focusNodeAdjacency: true,

            tooltip: {
              trigger: 'item',
              // formatter: '{b}'
              formatter: function(params) { // 连接线上提示文字格式化
                return params.data.name
              }
            },
            circular: {
              rotateLabel: true
            },
            data: [

            ],
            links: [

            ],
            // categories: categories,
            roam: true,
            symbol: 'circle',
            symbolSize: 30,

            label: {
              normal: {
                position: 'right',
                show: true,
                fontSize: 16,
                color: "#fff"
              }
            },
            itemStyle:{
              color: "#F00"

            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0
              }
            },
            force: {
              repulsion: 500,
              // 这句是关闭动画
              layoutAnimation: true },
            emphasis: {
              lineStyle: {
                width: 10
              }
            }

          }
        ]

      }

    }
  },

  mounted() {
    if (localStorage.getItem('type') === 'tea') {
      this.updateflag = true
    } else {
      this.updateflag = false
    }
    this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = this.coures[0]
    this.searchTerm = this.selcoures + '知识点'
    this.findInfoByTerm()
    const myChart = echarts.init(document.getElementById('myChart'))
    var _this = this

    // 绘制图表
    myChart.setOption(_this.option)

    myChart.on('mousedown', eConsole)
    myChart.on('click', eConsoledb)

    function eConsole(param) {
      _this.conid = param.data.label
      // console.log(_this.conid);
      //
    }

    function eConsoledb(param) {
      _this.conid = param.data.id
      // console.log(param.data.value)

      _this.knowname = param.data.name
      const data = { 'cid': param.data.id }
      kginfobycid(data).then(response => {
        if (_this.singleMulti) {
          _this.option.series[0].data = _this.option.series[0].data.concat(response.data.graph.nodes)
          var nobj = {}
          _this.option.series[0].data = _this.option.series[0].data.reduce(function(item, next) {
            // console.log(next.name, nobj)
            nobj[next.id] ? '' : nobj[next.id] = true && item.push(next)
            return item
          }, [])

          _this.option.series[0].links = _this.option.series[0].links.concat(response.data.graph.links)

          var lobj = {}
          _this.option.series[0].links = _this.option.series[0].links.reduce(function(item, next) {
            lobj[next.cfflag] ? '' : lobj[next.cfflag] = true && item.push(next)
            return item
          }, [])
          _this.kngloss = response.data.gloss
        } else {
          _this.option.series[0].data = _this.option.series[0].data = response.data.graph.nodes
          _this.option.series[0].links = _this.option.series[0].links = response.data.graph.links
          _this.kngloss = response.data.gloss
        }
        // console.log(_this.option.series[0].links)
        myChart.setOption(_this.option)

        // this.$message(response.data)
        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
      // console.log(param.data.v)

      // _this.conid=param.data.value;
      //   _this.$axios.post('http://39.104.151.240:7000/findConId', data).then((res) => {
      //     // console.log(res.data.data);

      //     _this.option.series[0].data = res.data.data
      //     // res.data.data;
      //     _this.option.series[0].links = res.data.links

    //     myChart.setOption(_this.option)
    //   })
      // console.log(_this.conid);
    }
    // this.findInfoByTerm()
  },
  created() {

  },

  methods: {
    $imgAdd(pos, $file) {
      // console.log(pos)
      const that = this
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      // formdata.append('expidx', this.selhw)
      formdata.append('coures', this.selcoures)

      // console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recKnImg(formdata).then(response => {
        this.$refs.md.$img2Url(pos, response.data)

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeGloss() {
      const data = { 'cid': this.conid, 'gloss': this.kngloss }
      changekngloss(data).then(response => {
        this.$message(response.data)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    singleKnowledge() {
      this.singleMulti = !this.singleMulti
      if (this.singleMulti) { this.showModel = '多知识点模式' } else { this.showModel = '单知识点模式' }
    },
    coureschange() {
      // console.log(this.selcoures)
      this.searchTerm = this.selcoures + '知识点'
      this.findInfoByTerm()
    },

    findInfoByTerm() {
      const data = { 'term': this.searchTerm.trim() }
      kginfobyterm(data).then(response => {
        // this.tableData = response.data
        const myChart = echarts.init(document.getElementById('myChart'))
        this.option.series[0].data = response.data.graph.nodes
        this.option.series[0].links = response.data.graph.links
        if (response.data.gloss !== '') {
          this.kngloss = response.data.gloss
        }

        myChart.setOption(this.option)
        // this.$message(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    idFindCon() {
      const data = { 'conterm': this.searchValue }

      // this.$axios.post('http://192.168.101.2:5000/findCon',data).then((res)=>{
      this.$axios.post('http://39.104.151.240:7000/findConTerm', data).then((res) => {
        console.log(this.option)
        const myChart = echarts.init(document.getElementById('myChart'))
        this.option.series[0].data = res.data.data
        this.option.series[0].links = res.data.links
        myChart.setOption(this.option)
      })
    },

    setFocus() {
      this.$refs.search.setFocus()
    },
    onSubmit() {
      // let myChart = echarts.init(document.getElementById('myChart'))
      // this.option.series[0].data=[
      //        { name: '乔布斯', value : 10, label: '乔布斯\n（主要）adfasfadsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'},
      //        { name: '丽萨-乔布斯',value : 2}];
      //
      // myChart.setOption(this.option);
      this.idFindCon()
    },
    onCancel() {
      console.log('on cancel')
    }

  }

}
</script>

<style scoped >
	@borderColor: #F7F8Fd;
	@whiteColor: #FFFFFF;
	.home {
		.weui-search-bar {
			background-color: red;
		}
		.top-info {
			width: 100%;
			height: 30px;
			background-color: #bcccdc;
			border-bottom: 10px solid @borderColor;
		}
		.nearby-store,.special-banner {
			width: 100%;
			height: 87px;
			background-color: #bcccdc;
			border-bottom: 10px solid @borderColor;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.screen-list {
			padding: 0px 15px;
			height: 50px;
			background-color: @whiteColor;
			border-bottom: 10px solid @borderColor;
			position: relative;
			.screen-box {
				width: 96%;
				height: 100%;
				overflow-x: scroll;
				overflow-y: hidden;
				ul {
					width: auto;
					white-space:nowrap;
					line-height: 50px;
					float: left;
					li {
						float: left;
						margin: 0px 8px;
						font-size: 14px;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						color: #999999;
					}
					li.active{
						color: #000000;
						border-bottom: 2px solid #000000;
					}
				}
			}
			.icon-right {
				position: absolute;
				right: 5px;
				top: 10px;
			}
		}
		.good-list {
			.star-single {
				border-bottom: 10px solid @borderColor;
				background-color: @whiteColor;
				h3 {
					height: 50px;
					line-height: 50px;
					text-indent: 20px;
				}
				ul {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					li {
						width: 48%;
						.good-img-box {
							width: 100%;
							height: 182px;
							background-color: #eaeeef;
							img {
								width: 100%;
								height: 100%;
							}
						}
						.good-info-box {
							height: 78px;
							padding: 10px 20px 0px;
							font-size: 14px;
							.good-name {
								height: 43px;
								-webkit-line-clamp: 2;
								/*用来限制在一个块元素显示的文本的行数*/
								display: -webkit-box;
								/*必须结合的属性，将对象作为弹性伸缩盒子模型显示*/
								-webkit-box-orient: vertical;
								/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
								overflow: hidden;
							}
							span{
								font-size: 16px;
							}
						}
					}
				}
			}
		}
	}
</style>
