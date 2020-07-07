import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Form, Modal, Input, DatePicker, Row, Col, InputNumber } from "antd";
import moment from "moment";
const { TextArea } = Input;
const FormItem = Form.Item;
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
    const { setVisible, currentData } = example2
    return {
        setVisible,
        settingData: currentData.settingData || {},
        loading: !!loading.effects['example2/setting']
    }
})
class SetModal extends PureComponent {
    componentWillReceiveProps = (nextProps) => {
        if (this.props.setVisible !== nextProps.setVisible && nextProps.setVisible) {
            this.props.form.resetFields();
        }
    }
    //modal取消事件
    onCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "example2/save",
            payload: {
                setVisible: false
            }
        })
    }
    //modal确定事件
    onOk = () => {
        const { dispatch, settingData, form: { validateFields } } = this.props;
        validateFields((error, values) => {
            if (!!error) return;
            dispatch({
                type: "example2/setting",
                payload: { ...settingData, ...values }
            })
        })
    }
    render() {
        const { loading, setVisible, form: { getFieldDecorator }, settingData } = this.props;
        return (
            <Modal
                visible={setVisible}
                title={"设置"}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
                confirmLoading={loading}
                width="50%"
            >
                <Form {...formLayout}>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"主页"}>
                                {getFieldDecorator('homepage', {
                                    initialValue: settingData.homepage,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={"名称"}>
                                {getFieldDecorator('name', {
                                    initialValue: settingData.name,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"英文名称"}>
                                {getFieldDecorator('enName', {
                                    initialValue: settingData.enName,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={"入职日期"} >
                                {getFieldDecorator('birthday', {
                                    initialValue: settingData.birthday && moment(settingData.birthday),
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <DatePicker style={{ width: "100%" }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"爱好"}>
                                {getFieldDecorator('hobby', {
                                    initialValue: settingData.hobby,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={"身高"}>
                                {getFieldDecorator('heignt', {
                                    initialValue: settingData.heignt,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <InputNumber style={{ width: "100%" }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={12}>
                            <FormItem label={"描述"}>
                                {getFieldDecorator('description', {
                                    initialValue: settingData.description,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <TextArea rows={4} style={{ width: "100%" }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default SetModal

