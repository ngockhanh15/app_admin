import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { Button, Modal, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineExclamationCircle, AiOutlineEye } from 'react-icons/ai';

class ListStaff extends Component {
    constructor(){
        super()

        this.state= {
            dataSource: [
                {id: 1, name:'Trần Thị Ngọc Khánh', unit: 'CNTT', birthday: '15/11/2002', born: 'Ngọc Lập-Yên Lập-Phú Thọ', sex: 'Nữ', note:''}
            ],
            staff: {}
        }
    }

    editStaff = (staff) =>{
        console.log(staff);
    }

    deleteStaff = () =>{
        console.log(this.state.staff);
    }

    openDeleteConfirmModal = (staff) => {
        this.setState({...this.state, staff: staff});

        console.log(staff);
        
        const message = 'Bạn có muốn xóa cán bộ ' + staff.name +' không?';

        Modal.confirm({
            title: 'Xác nhận',
            icon: <AiOutlineExclamationCircle color='red' size={25}/>,
            content: message,
            onOk: this.deleteStaff,
            okText: 'Xóa',
            cancelText: 'Thoát'
        })
    }

    render() {
        const { navigate } = this.props.router;

        return (
            <>
                <ContentHeader 
                navigate={navigate} 
                title="Danh sách cán bộ" 
                className="site-page-header"
                ></ContentHeader>

                <Table 
                dataSource={this.state.dataSource} 
                size='small' 
                rowKey='id'
                >
                    <Column 
                    title='Mã CB' 
                    key='id' 
                    dataIndex='id' 
                    width={50} 
                    align='center'
                    ></Column>
                    <Column 
                    title='Họ và tên' 
                    key='name' 
                    dataIndex='name'
                    width={120} 
                    align='center'
                    ></Column>
                    <Column 
                    title='Đơn vị' 
                    key='unit' 
                    dataIndex='unit' 
                    width={60}
                    align='center' 
                    ></Column>
                    <Column 
                    title='Ngày sinh' 
                    key='birthday' 
                    dataIndex='birthday' 
                    width={10} 
                    align='center'
                    ></Column>
                    <Column 
                    title='Nơi sinh' 
                    key='born' 
                    dataIndex='born' 
                    width={140} 
                    align='center'
                    ></Column>
                    <Column 
                    title='Giới tính' 
                    key='sex' 
                    dataIndex='sex' 
                    width={60} 
                    align='center'
                    ></Column>
                    <Column 
                    title='Ghi chú' 
                    key='note' 
                    dataIndex='note' 
                    width={100} 
                    align='center'
                    ></Column>
                    <Column 
                    title='Chức năng' 
                    key='action' 
                    width={50} 
                    align='center'
                    render={(_, record)=>(
                        <Space size='middle'>
                            <Button key={record.key} type='primary' size='small'>
                                <AiOutlineEye style={{marginRight: 8 }} /> Xem
                            </Button>
                            <Button key={record.key} type='primary' size='small'
                            onClick={()=>this.editStaff(record)}>
                                <AiOutlineEdit style={{marginRight: 8 }} /> Sửa
                            </Button>
                            <Button key={record.key} type='primary' danger size='small'
                            onClick={()=>this.openDeleteConfirmModal(record)}>
                                <AiOutlineDelete style={{marginRight: 8 }} /> Xóa
                            </Button>
                        </Space>
                    )}
                    ></Column>
                </Table>
            </>
        );
    }
}

export default withRouter(ListStaff)