import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { ExhibitTable } from "quant-ui";
import { Card, Form, Modal, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import AddModal from "./addModal";
import { getColumns } from "./utils"
import dict from "@/utils/dict"

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

@Form.create()
@connect(({ example1, loading }) => {
    const { dataSource, pageNum, pageSize, totalCount } = example1
    return {
        dataSource,
        pageNum,
        pageSize,
        totalCount,
        loading: !!loading.effects['example1/findByQuery']
    }
})
class Index extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            columns: getColumns(this)
        }
    }
    componentDidMount = () => {
        this.onSearch(1, 10);
    }

    //新增点击事件
    addClick = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "example1/save",
            payload: {
                addVisible: true,
                isUpdate: false,
                currentData: {}
            }
        })
    }
    //删除事件
    delete = (id) => {
        const { dispatch } = this.props;
        confirm({
            title: '确认删除?',
            content: '删除后将无法回退！',
            onOk() {
                dispatch({
                    type: "example1/delete",
                    payload: { id }
                })
            },
            onCancel() { },
        });

    }
    //修改事件
    update = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: "example1/save",
            payload: {
                addVisible: true,
                isUpdate: true,
                currentData: record
            }
        })
    }
    //查询
    onSearch = (pageNum, pageSize) => {
        const { dispatch, form: { validateFields } } = this.props;
        validateFields((error, values) => {
            if (!!error) return;
            dispatch({
                type: "example1/findByQuery",
                payload: { ...values, pageNum, pageSize }
            })
        })
    }
    //页码变化回调
    onChange = ({ current: pageNum, pageSize }) => {
        this.onSearch(pageNum, pageSize)
    }
    render() {
        const { dataSource, form: { getFieldDecorator }, loading, pageNum, pageSize, totalCount } = this.props;
        const { columns } = this.state;
        return (
            <Card style={{ margin: 14 }}>
                <Form layout={"inline"}>
                    <FormItem label="姓名">
                        {getFieldDecorator('name')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="年龄">
                        {getFieldDecorator('age')(
                            <InputNumber style={{ width: "100%" }} />
                        )}
                    </FormItem>
                    <FormItem label="人员状态">
                        {getFieldDecorator('status')(
                            <Select style={{ width: 172 }}>
                                {dict["status"].map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="出生日期">
                        {getFieldDecorator('birthday')(
                            <DatePicker />
                        )}
                    </FormItem>
                    <FormItem >
                        <Button style={{ marginRight: 14 }} onClick={() => this.onSearch(pageNum, pageSize)} icon="search" type="primary">查询</Button>
                        <Button icon="plus" type="primary" onClick={this.addClick}>新增</Button>
                    </FormItem>
                </Form>
                <div style={{ marginTop: "24px" }}>
                    <ExhibitTable
                        bordered
                        columns={columns}
                        loading={loading}
                        dataSource={dataSource}
                        rowKey="id"
                        onChange={this.onChange}
                        pagination={{
                            current: pageNum,
                            pageSize: pageSize,
                            total: totalCount,
                            showSizeChanger: true,
                            showTotal: (total, range) => range[0] + '-' + range[1] + ' 共 ' + total + '条'
                        }}
                    />
                </div>
                <AddModal />
            </Card>
        )
    }
}
export default Index
