import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Card, Form, Row } from 'antd';
import AddModal from "./addModal";
import InputMoney from '@/components/InputMoney'

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
        }
    }

    render() {
        return (
            <Card style={{ margin: 14 }}>
                <Row>
                    <div style={{ width: '250px', margin: '100px auto' }}>
                        金额：<InputMoney style={{ width: '200px' }} />
                    </div>
                </Row>
                <AddModal />
            </Card>
        )
    }
}
export default Index
