import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'


import { reqCategorys, reqAddCategory, reqUpdateCategory } from "../../api";
import AddUpdateForm from "./add-update-form";
import  LinkButton  from '../../components/link-button'
/**
 * 分类管理
 * 
 */

export default class Category extends Component {
  state = {
    categorys: [],
    loading: false,
    showStatus: 0 // 0: 不显示, 1: 显示添加, 2: 显示修改
  }
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 400,
        render: (category) => (<LinkButton onClick={() => {
        this.category = category;// 保存当前分类, 其它地方都可以读取到
        this.setState({ showStatus: 2 })
        }}
        >修改分类</LinkButton>)

      },
    ];
  }
  getCategorys = async () => {
    this.setState({ loading: true})
    const result = await reqCategorys()
    this.setState({ loading: false })
    if (result.status === 0) {
      const categorys = result.data;
      this.setState({
        categorys,
      })
    } else {
      message.error('获取数据失败')
    }
  }
  handleOk = async ()=> {
     // 进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 验证通过后, 得到输入数据
        const { categoryName } = values
        const {showStatus} = this.state
        let result
        if (showStatus===1) { // 添加
          // 发添加分类的请求
          result = await reqAddCategory(categoryName)
        } else { // 修改
          const categoryId = this.category._id
          result = await reqUpdateCategory({ categoryId, categoryName })
        }

        this.form.resetFields() // 重置输入数据(变成了初始值)
        this.setState({ showStatus: 0 })
        const action = showStatus===1 ? '添加' : '修改'
        // 根据响应结果, 做不同处理
        if (result.status===0) {
          // 重新获取分类列表显示
          this.getCategorys()
          message.success(action + '分类成功')
        } else {
          message.error(action + '分类失败')
        }
      }
    })
  };

  handleCancel =()=> {
    this.form.resetFields(); 
    this.setState({
      showStatus: 0
    });
  };
  componentWillMount() {
    //初始化列信息
    this.initColumns()
  }
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    const category = this.category || {};
    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
        <Icon type="plus" />
        添加
      </Button>
    )
    const { categorys, loading, showStatus } = this.state;
    return (
      <div>
        <Card extra={extra} style={{ width: "100%" }}>
          <Table
            columns={this.columns}
            dataSource={categorys}
            bordered={true}
            rowKey="_id"
            loading={loading}
            pagination={{ showQuickJumper: true, defaultPageSize: 6 }}
          />
          <Modal
            title={showStatus === 1 ? "添加分类" : "修改分类"}
            visible={showStatus !== 0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm
              setForm={form => (this.form = form)}
              categoryName={category.name}
            />
          </Modal>
        </Card>
      </div>
    );
  }
}
//将子组件传过来的form对象保存到当前组件,当前分类传给子组件
