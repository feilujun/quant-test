import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Form, Modal, Input, DatePicker, Row, Col, Select, InputNumber } from "antd";
import moment from "moment";
import dict from "@/utils/dict"
const FormItem = Form.Item;
const Option = Select.Option;

const formLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    },
}
@Form.create()
@connect(({ example2, loading }) => {
    const { addVisible, isUpdate, currentData } = example2
    return {
        addVisible,
        isUpdate,
        currentData,
        loading: !!loading.effects['example2/update'] || !!loading.effects['example2/add']
    }
})
class AddModal extends PureComponent {
    componentWillReceiveProps = (nextProps) => {
        if (this.props.addVisible !== nextProps.addVisible && nextProps.addVisible) {
            this.props.form.resetFields();
        }
    }
    //modal取消事件
    onCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "example2/save",
            payload: {
                addVisible: false
            }
        })
    }
    //modal确定事件
    onOk = () => {
        const { dispatch, isUpdate, currentData, form: { validateFields } } = this.props;
        validateFields((error, values) => {
            if (!!error) return;
            if (isUpdate) { //修改
                dispatch({
                    type: "example2/update",
                    payload: { ...currentData, ...values }
                })
            } else {          //新增
                dispatch({
                    type: "example2/add",
                    payload: values
                })
            }
        })
    }
    render() {
        const { loading, addVisible, form: { getFieldDecorator }, currentData, isUpdate } = this.props;
        return (
            <Modal
                visible={addVisible}
                title={isUpdate ? "修改" : "新增"}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
                confirmLoading={loading}
                width="50%"
            >
                <Form {...formLayout}>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"姓名"}>
                                {getFieldDecorator('name', {
                                    initialValue: currentData.name,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>

                        </Col>
                        <Col span={12}>
                            <FormItem label={"年龄"}
                            >
                                {getFieldDecorator('age', {
                                    initialValue: currentData.age,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <InputNumber style={{ width: "100%" }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"出生日期"}
                            >
                                {getFieldDecorator('birthday', {
                                    initialValue: currentData.birthday && moment(currentData.birthday),
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <DatePicker style={{ width: "100%" }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={"工资"}
                            >
                                {getFieldDecorator('salary', {
                                    initialValue: currentData.salary,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <InputNumber style={{ width: "100%" }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"人员状态"}
                            >
                                {getFieldDecorator('status', {
                                    initialValue: currentData.status,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select>
                                        {dict["status"].map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default AddModal