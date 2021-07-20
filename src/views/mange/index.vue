<template>
    <div class="table">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 样本列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div style="color:black;font:bold 50px 宋体;;text-align:center">用户管理</div>
        
        <div class="container">
           
            <div class="handle-box">
 
          <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input> 
                <div>
                  <el-tag class="tag-title">
                    用户选择:
                  </el-tag>
                  <el-radio-group v-for="item in roles" :key="item" v-model="selroles">
                    <el-radio border :label="item.roleName" @change="getData">{{ item.roleDesc }}</el-radio>
                
                  </el-radio-group>
                </div>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="姓名" >
                </el-table-column>
                <el-table-column prop="usersex" label="性别" sortable width="70" >
                </el-table-column>
				<el-table-column prop="userno" label="账号" >
				</el-table-column>
                <el-table-column prop="usercollege" label="学院">
                </el-table-column>
                <el-table-column prop="userschool" label="学校"  >
                </el-table-column> 
                <el-table-column prop="stuGrade" label="年级" >
                </el-table-column>
                <el-table-column prop="stuClass" label="班级" >
                </el-table-column>
				 <el-table-column prop="type" label="角色" width="120"></el-table-column >
               <el-table-column prop="userphone" label="电话"  >
                </el-table-column>
                <el-table-column prop="usermail" label="邮箱"  >
                </el-table-column>
                <el-table-column prop="userqq" label="qq" >
                </el-table-column> 
				<el-table-column label="更多" >
				  <template slot-scope="scope" width="130">
				 	<el-button type="text"  class="red" @click="handleRoles(scope.row)">分配角色</el-button>  
				    <!-- <el-button type="text"    @click="handleHomework(scope.$index, scope.row)">输入检测结果</el-button>   -->
				  <!--  <el-button type="text"   @click="handleDetail(scope.$index, scope.row)"> 详细信息</el-button>  -->
				  </template>
				</el-table-column>
            </el-table>
          <div class="pagination">
               
                 <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" :total="500" style="float:right;">
			</el-pagination>   
            </div>
        </div> 
        <!-- 提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="30%"center> 
           <el-select v-model="oproles"  placeholder="请选择角色" @change="hegesel">
             <el-option
               v-for="item in roles"
               :key="item"
               :label="item.roleDesc"
               :value="item.roleName">
             </el-option>
           </el-select> 
            
           <span slot="footer" class="dialog-footer"> 
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkRow()">确 定</el-button>
            </span>
        </el-dialog>
		
		 
    </div>
</template>

<script>
	import { getRight,getAlluser,changeRoles} from '@/api/role'
    export default {
        name: 'peopletable',
        data() {
            return {
                url: './vuetable.json', 
                tableData: [], 
                cur_page: 1,
                pagesize:20,
                multipleSelection: [],
                select_cate: '',
                select_word: '', 
                delVisible: false ,
				roles:[],
				selroles:'other',
				tableData:[],
				userno:'' ,
				oproles:''
				
            }
        },
        created() {
            
        },
        mounted(){
			this.getRight();
            this.getData();
			
        },
       watch: {
        select_word(val) {
        this.select_word = val  
        this.getData()
         }
       },
             computed: {
                data() {
                        return this.tableData.filter((d) => {
                            let is_del = false;
                           
                           
                            if (!is_del) { 
                        		console.log(this.select_word)
                        		 
                                if ( (d.username.indexOf(this.select_word) > -1 ) 
       							|| (d.stuClass.indexOf(this.select_word)>-1)|| (d.stuGrade.indexOf(this.select_word)>-1) 
       							 || (d.usercollege.indexOf(this.select_word)>-1) ) {
                        			
                                    return d;
                                }
                            }
                        })
                }
             },	 
        methods: { 
			handleRoles(user){
				this.delVisible=true
				this.userno=user.userno
			},
			getRight(){
				getRight().then(res => {
				  this.roles = res.data;
				  this.roles.reverse()
				  this.selroles= this.roles[0].roleName 
				})
				
			},
			
            handleSizeChange(size){
	        this.pagesize = size;
			this.getData();
	            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(); 
            },
            // 获取 easy-mock 的模拟数据
            getData() {
				const data ={'roles':this.selroles,'page':this.cur_page,'size':this.pagesize}
                 getAlluser(data).then(res => {
                   this.tableData = res.data; 
                 })
            },
            search() {
                this.is_search = true;
                if (this.select_word){
                var lily = this.dataBak.filter((p) => {
                return p.season == this.select_word;
                });
                this.tableData=lily
                }else this.tableData=this.dataBak;

            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },

            
			 
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
             
            // 确定角色
            checkRow(){   
				let data ={'type': this.oproles,'userno':this.userno}; 
				changeRoles(data).then(()=>{ 
				 });
                this.$message.success('分配成功');
                this.delVisible = false;
				this.getData();
            }, 
		   
    }
}
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    }
</style>
