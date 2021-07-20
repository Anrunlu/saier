<template>
    <div>
       <el-card>
          <el-row>
            <el-col>
              <el-button type="primary" @click="addrole">
                  添加角色
              </el-button>
			  <el-dialog title="新增" :visible.sync="addVisible" width="30%">
			  		    <el-form ref="form"   label-width="100px"> 
			  		        <el-form-item label="角色名称">
			  		            <el-input v-model="roleName"></el-input>
			  		        </el-form-item>
			  		        <el-form-item label="角色描述">
			  		            <el-input v-model="roleDesc"></el-input>
			  		        </el-form-item> 
			  		    </el-form>
			  		    <span slot="footer" class="dialog-footer">
			  		        <el-button @click="addVisible = false">取 消</el-button>
			  		        <el-button type="primary" @click="saveadd">确 定</el-button>
			  		    </span>
			  		</el-dialog> 
            </el-col>
            </el-row>  
       </el-card> 

       <el-table :data="roleList" border stripe >
         <!-- 索引 -->
         <el-table-column type="expand">
           <template slot-scope="scope"> 
             
             <el-row class="vcenter">
               <el-col :span="4" :class="['bdbottom','bdtop']"><el-tag style="margin:7px">{{scope.row.roleDesc}}</el-tag>
               <i class="el-icon-caret-right"></i>
               </el-col>
                <el-col :span="20"> 
                    <el-row :class="['bdbottom',i===0 ? 'bdtop':'']" v-for="(item,i) in scope.row.child" :key="i">
                      <el-col :span="30">
                        <!-- ❌ -->
                        <el-tag style="margin:7px" type="success" closable @close="removeRight(scope.row,item.id)">{{item.name}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                    </el-row>
                </el-col>
             </el-row>
             <!-- {{scope.row.roleDesc}} -->
           </template>



         </el-table-column>
         <el-table-column type="index"></el-table-column>
         <el-table-column label="角色名称" prop="roleName"></el-table-column>
         <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
         <el-table-column label="操作" >
           <template slot-scope="scope">
             <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
             <el-button size="mini" type="danger" icon="el-icon-delete" @click="handledeleteRole(scope.row.id)">删除</el-button>
             <!-- <el-button type="danger">危险按钮</el-button> -->
             <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRight(scope.row)">分配权限</el-button> 
           </template>
         </el-table-column>
       </el-table>
	   <el-dialog
	     title="分配权限"
	     :visible.sync="setRightDialogVisible"
	     width="30%" >
	       <el-table
	           ref="multipleTable"
	           :data="tableData"
	           tooltip-effect="dark"
	           style="width: 100%"
			    max-height="250"
			   row-key="id"
	           @selection-change="handleSelectionChange">
	           <el-table-column
	             type="selection"
	             width="55">
	           </el-table-column>
	           <el-table-column
	             label="id"
	             width="120">
	             <template slot-scope="scope">{{ scope.row.id}}</template>
	           </el-table-column>
	          <el-table-column
	             prop="name"
	             label="权限"
	            >
	           </el-table-column>
	           <!-- <el-table-column
	             prop="address"
	             label="地址"
	             show-overflow-tooltip>
	           </el-table-column> -->
	         </el-table>
	        
	     <span slot="footer" class="dialog-footer">
	       <el-button @click="setRightDialogVisible = false">取 消</el-button>
	       <el-button type="primary" @click="allotRight()">确 定</el-button>
	<!--  <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
	     </span>
	   </el-dialog>
	   <el-dialog
	     title="是否删除"
	     :visible.sync="deleteVisible"
	     width="30%" > 
	     <span slot="footer" class="dialog-footer">
	       <el-button @click="deleteVisible = false">取 消</el-button>
	       <el-button type="primary" @click="deleteRole()">确 定</el-button>
	   
	     </span>
	   </el-dialog>
    </div>
</template>
<script>
// import ex from '../../router/index.js'
import { addRole, getRight,updateRight, removeRight,getRoute,allotRight,removeRole } from '../../api/role.js'
 

import { log } from "util";
import { deflate } from "zlib";
export default {
  data() {
    return {
	multipleSelection: [],
	 tableData: [],
	//新增角色
		addVisible:false,
		roleName:'',
		roleDesc:'',
		deleteVisible:false,
      // 控制对话框显示与否
      setRightDialogVisible: false, 
      // 角色信息
      roleList: [],
	  role:'',
	  roleid:'',
	  //已选择权限
	  optable:[],
	  child:[]
    };
  },
  created() {
    
  },
  mounted() {
	this.getRight()  
    this.getRouteList();
    this.toggleSelection()
  },
  methods: {
	  //获得多选权限
	   handleSelectionChange(val) {
	          this.multipleSelection = val;
	        },
	  addrole(){
		  this.addVisible=true
	  },
	  saveadd(){ 
		  const data = {'roleName':this.roleName,'roleDesc':this.roleDesc} 
		  addRole(data).then(response=>{  
		  })
		  this.getRight()
		  this.addVisible=false 
		  },
    getRight(){
		getRight().then(res => {
		  this.roleList = res.data; 
		}); 
	}, 
	//获得权限
    getRouteList() {
		getRoute().then(res=>{ 
			this.tableData = res.data;  
			 //console.log(this.tableData)
		})
	},
	// 分配权限
	showSetRight(role) {
	  this.role=role.roleDesc
	  this.child=role.child
	  
	  this.setRightDialogVisible = true;
	  this.toggleSelection()
	  //console.log(this.child)
	 
	},
	 //显示已选择权限
	 toggleSelection() {  
		
       this.$nextTick(function () {
		   this.$refs.multipleTable.clearSelection() 
		   for(var i in this.child) {
				//alert("1")
				//alert(this.child)
				  for(var j in this.tableData){ 
					  if(this.tableData[j].id===this.child[i].id){
						  this.$refs.multipleTable.toggleRowSelection(this.tableData[j]);
					  }   
				  } 
			   }
			 
			})
	     },
	     
	 
	//获得选中权限
	allotRight(){
		const data = {'oproutes':this.multipleSelection,'oprole':this.role} 
		allotRight(data).then(response=>{  
		})
		this.setRightDialogVisible = false
		this.getRight() 
		this.$message.info("分配成功");
		
		},
    async removeRight(role, id) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmRes !== "confirm") {
        // console.log("sadas");
        return this.$message.info("取消了删除！");
      }
      // 删除
      else{
        // 删除某个权限
        // 前端删除
        role.child.forEach(item => {
        if(item.id==id){
          var index=role.child.indexOf(item)
          console.log(item)
          role.child.splice(index, 1)
        }
      });
      // 后台删除
      removeRight({"data":[role.id,id]}).then(response=>{
        console.log(res)
      })
      } 
    
    },
   handledeleteRole(index){
	   this.deleteVisible=true;
	   this.roleid = index;
   },
    // 删除角色
    deleteRole() {  
	  removeRole({"roleid":this.roleid}).then(response=>{
      this.getRight()   
      })
	  this.deleteVisible=false;
    }
  }
};
</script>

<style scoped lang="scss">
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>

