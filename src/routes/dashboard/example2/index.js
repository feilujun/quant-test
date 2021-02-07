import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { ExhibitTable } from "quant-ui";
import { Card, Form, Modal, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import AddModal from "./addModal";
import { getColumns } from "./utils"
import SetModal from "./setModal"
import dict from "@/utils/dict"

//大写金额转换方法： 
function DX(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

@Form.create()
@connect(({ example2, loading }) => {
    const { dataSource, pageNum, pageSize, totalCount } = example2
    return {
        dataSource,
        pageNum,
        pageSize,
        totalCount,
        loading: !!loading.effects['example2/findByQuery']
    }
})
class Index extends PureComponent {
    constructor(props) {
        super();

        this.state = {
            saveMoney: '',//input框里的初始值
            bigText: '',//大写金额
        };
        this.handleChangeSave = this.handleChangeSave.bind(this);
    }
    handleChangeSave(e) {
        //获取值并进行实时改变input框的数据显示，进行位数控制
        const data = e.target.value; //获取输入的值
        const num = data.replace(/,/g, '');//把输入的逗号变成空
        const bigText = DX(num); //调用大写方法
        var reg = /^[0-9\.\d]+$/; //正则匹配输入的是否符合规范
        if (reg.test(num)) {
            if (num.indexOf('.') > '-1') //判断小数点存在的情况下
            {
                const decimal = num.split('.')[1];
                const wholeNumber = num.split('.')[0];
                if (wholeNumber === '') {
                    this.setState({
                        saveMoney: '0' + '.' + decimal, //如果小数点前为空的话默认为0 
                        bigText: bigText
                    });
                }
                else {
                    if (num >= 1000 && decimal.length < 3 && num.length < 16) { this.setState({ saveMoney: parseInt(num) + '.' + decimal, bigText: bigText }); }
                    else if (num >= 0 && num < 1000 && decimal.length < 3) {
                        this.setState({
                            saveMoney: parseInt(num) + '.' + decimal,
                            bigText: bigText
                        });
                    }
                }
            }
            else {
                if (num >= 0 && num.length < 13) { //判断小数点不存在的情况下
                    console.log(num, bigText)
                    this.setState({
                        saveMoney: num,
                        bigText: bigText
                    });
                }
            }
        }
        else if (num === '') //判断为空时
        {
            this.setState({
                saveMoney: '',
                bigText: ''
            });
        }
        // console.log(this.state.saveMoney, this.state.bigText)
    }
    render() {
        const { dataSource, form: { getFieldDecorator }, loading, pageNum, pageSize, totalCount } = this.props;
        const { columns } = this.state;
        console.log(this.state.bigText)
        return (
            <Card style={{ margin: 14 }}>
                <input type="text" id='box'
                    value={this.state.saveMoney}
                    onChange={this.handleChangeSave}
                />
                <p>{this.state.bigText}</p>
            </Card>
        )
    }
}
export default Index
