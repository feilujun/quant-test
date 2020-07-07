import React from "react"
import { Icon, Divider } from "antd"
import dict from "@/utils/dict"
export function getColumns(page) {
    return [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
    },
    {
        title: '籍贯',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '工资',
        dataIndex: 'salary',
        key: 'salary',
        align: "right"
    },
    {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: '人员状态',
        dataIndex: 'status',
        key: 'status',
        option: dict["status"]
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a onClick={() => page.update(record)} ><Icon type="edit" /></a>
                <Divider type="vertical" />
                <a onClick={() => page.delete(record.id)} ><Icon type="delete" /></a>
                <Divider type="vertical" />
                <a onClick={() => page.setting(record)} ><Icon type="setting" /></a>
            </span>
        ),
    }]
}