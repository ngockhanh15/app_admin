import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { Button, Modal, Space, Table, Pagination, Divider } from 'antd';
import Column from 'antd/lib/table/Column';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineExclamationCircle} from 'react-icons/ai';
import { connect } from 'react-redux';
import { clearStaffState, getStaffs } from '../../redux/actions/staffAction';

class ListStaff extends Component {
    constructor() {
        super();

        this.state = {
            staff: {},
            limit: 1, // Default current page
            pageIndex: 5, // Default number of items per page
        };
    }

    componentDidMount = () => {
        this.fetchStaffs();
    };

    componentWillUnmount = () => {
        this.props.clearStaffState();
    };

    fetchStaffs = () => {
        const { limit, pageIndex } = this.state;
        this.props.getStaffs(limit, pageIndex);
    };
    
    handleTableChange = (page, pageSize) => {
        this.setState({ limit: page, pageIndex: pageSize }, () => {
            this.fetchStaffs();
        });
    };

    editStaff = (staff) => {
        console.log(staff);
    };

    deleteStaff = () => {
        console.log(this.state.staff);
    };

    openDeleteConfirmModal = (staff) => {
        this.setState({ staff: staff });

        const message = 'Bạn có muốn xóa cán bộ ' + staff.userName + ' không?';

        Modal.confirm({
            title: 'Xác nhận',
            icon: <AiOutlineExclamationCircle color='red' size={25} />,
            content: message,
            onOk: this.deleteStaff,
            okText: 'Xóa',
            cancelText: 'Thoát',
        });
    };

    render() {
        const { navigate } = this.props.router;
        const { staffs } = this.props;
        const { limit, pageIndex } = this.state;

        const dataSource = Array.isArray(staffs.items) ? staffs.items : [];
        const totalItems = staffs.totalCount || 0; // Ensure total count is available

        return (
            <>
                <ContentHeader
                    navigate={navigate}
                    title="Danh sách cán bộ"
                    className="site-page-header"
                />

                <Table
                    dataSource={dataSource}
                    size="small"
                    rowKey="id"
                    pagination={false}
                >
                    {/* Table Columns */}
                    <Column
                        title="Mã CB"
                        key="id"
                        dataIndex="id"
                        width={50}
                        align="center"
                    />
                    <Column
                        title="Hình ảnh"
                        key="image"
                        dataIndex="image"
                        width={50}
                        align="center"
                        render={(image) => (
                            <img
                                src= {image}
                                alt="Cán bộ"
                                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                            />
                        )}
                    />
                    <Column
                        title="Họ và tên"
                        key="userName"
                        dataIndex="userName"
                        width={120}
                        align="center"
                    />
                    <Column
                        title="Đơn vị"
                        key="unit_id"
                        dataIndex="unit_id"
                        width={60}
                        align="center"
                    />
                    <Column
                        title="Ngày sinh"
                        key="dateOfBirth"
                        dataIndex="dateOfBirth"
                        width={100}
                        align="center"
                    />
                    <Column
                        title="Nơi sinh"
                        key="placeOfBirth"
                        dataIndex="placeOfBirth"
                        width={140}
                        align="center"
                    />
                    <Column
                        title="Giới tính"
                        key="isSex"
                        dataIndex="isSex"
                        width={60}
                        align="center"
                        render={(text) => (text ? 'Nam' : 'Nữ')}
                    />
                    <Column
                        title="Ghi chú"
                        key="note"
                        dataIndex="note"
                        width={100}
                        align="center"
                    />
                    <Column
                        title="Chức năng"
                        key="action"
                        width={150}
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={() => this.editStaff(record)}
                                >
                                    <AiOutlineEdit style={{ marginRight: 8 }} /> Sửa
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    size="small"
                                    onClick={() => this.openDeleteConfirmModal(record)}
                                >
                                    <AiOutlineDelete style={{ marginRight: 8 }} /> Xóa
                                </Button>
                            </Space>
                        )}
                    />
                </Table>

                <Divider></Divider>
                
                <Pagination align='center'
                    current={limit} // Current page index
                    pageSize={pageIndex} // Number of items per page
                    total={totalItems}
                    onChange={this.handleTableChange}
                    showSizeChanger={false} // Disable size changer if you want a fixed number of items per page
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    staffs: state.staffReducer.staffs,
});

const mapDispatchToProps = {
    getStaffs,
    clearStaffState,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListStaff));
