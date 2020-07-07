import { POST, GET, api } from '@/utils/request';
import { message } from "antd"
export default {
    namespace: 'example1',
    state: {
        //modal数据
        addVisible: false,  //modal显示隐藏
        isUpdate: false,    //当前modal状态  新增还是修改
        currentData: {},    //当前操作数据

        //列表数据
        dataSource: [],     //表格数据
        queryCondition: {}, //查询条件

        //分页信息
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
    },
    effects: {
        //条件查询
        *findByQuery({ payload }, { call, put, select }) {
            const { queryCondition } = yield select(({ example1 }) => example1)
            let params = payload || queryCondition;
            const { errorCode, data, pageNum, pageSize, totalCount } = yield call(GET, api.example1.findByQuery, params);
            if (errorCode === 0) {
                yield put({
                    type: "save",
                    payload: {
                        dataSource: data,
                        pageNum: params.pageNum,  //应该为后台返回的页码
                        pageSize: params.pageSize,  //应该为后台返回的页码
                        totalCount: totalCount,

                        queryCondition
                    }
                })
            }
        },
        //新增
        *add({ payload }, { call, put, select }) {
            const { errorCode, data } = yield call(POST, api.example1.delete, payload);
            if (errorCode === 0) {
                message.success("新增成功!");
                yield put({
                    type: "save",
                    payload: {
                        addVisible: false
                    }
                })
                yield put({
                    type: "findByQuery"
                })
            }
        },
        //删除
        *delete({ payload }, { call, put, select }) {
            const { errorCode, data } = yield call(POST, api.example1.delete, payload);
            if (errorCode === 0) {
                message.success("删除成功!");
                yield put({
                    type: "findByQuery"
                })
            }
        },
        //修改
        *update({ payload }, { call, put, select }) {
            const { errorCode, data } = yield call(POST, api.example1.update, payload);
            if (errorCode === 0) {
                message.success("修改成功!");
                yield put({
                    type: "save",
                    payload: {
                        addVisible: false
                    }
                })
                yield put({
                    type: "findByQuery"
                })
            }
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload
            };
        }
    },
    subscriptions: {

    },
};
