import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import ContentHeader from '../common/ContentHeader';
import { Button, Modal, Space, Table, Pagination, Divider } from 'antd';
import Column from 'antd/lib/table/Column';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineExclamationCircle } from 'react-icons/ai';
import { connect } from 'react-redux';
import { clearStaffState, getStaffs, deleteStaff } from '../../redux/actions/staffAction';
import axios from 'axios';
import moment from 'moment';

class ListStaff extends Component {
    constructor() {
        super();

        this.state = {
            staff: {},
            limit: 1, // Default current page
            pageIndex: 5, // Default number of items per page
            units: [], // Store units fetched from the API
        };
    }

    componentDidMount = () => {
        this.fetchUnits(); // Fetch units first
        this.fetchStaffs(); // Fetch staff data
    };

    componentWillUnmount = () => {
        this.props.clearStaffState();
    };

    fetchUnits = () => {
        axios.get('http://192.168.6.16:45455/api/Unit')
            .then(response => {
                this.setState({ units: response.data.items });
            })
            .catch(error => {
                console.error('There was an error fetching the units!', error);
            });
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

    getUnitNameById = (id) => {
        const { units } = this.state;
        const unit = units.find(unit => unit.id === id);
        return unit ? unit.userName : 'N/A'; // Return 'N/A' if unit not found
    };

    editStaff = (staff) => {
        console.log(staff);
    };

    deleteStaff = () => {
        const { staff } = this.state;
        this.props.deleteStaff(staff.id);
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
                        width={80} // Adjusted width
                        align="center"
                    />
                    <Column
                        title="Hình ảnh"
                        key="image"
                        dataIndex="image"
                        width={70} // Adjusted width
                        align="center"
                        render={(image) => (
                            <img
                                src={`http://192.168.6.16:45455/Images/${image}`}
                                alt="Cán bộ"
                                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                            />
                        )}
                    />
                    <Column
                        title="Họ và tên"
                        key="userName"
                        dataIndex="userName"
                        width={150} // Adjusted width
                        align="center"
                    />
                    <Column
                        title="Đơn vị"
                        key="unit_id"
                        dataIndex="unit_id"
                        width={120} // Adjusted width
                        align="center"
                        render={(unit_id) => this.getUnitNameById(unit_id)} // Display unit name
                    />
                    <Column
                        title="Ngày sinh"
                        key="dateOfBirth"
                        dataIndex="dateOfBirth"
                        width={120} // Adjusted width
                        align="center"
                        render={(date) => {
                            // Format the date using moment.js
                            return date ? moment(date).format('DD/MM/YYYY') : 'N/A';
                        }}
                    />
                    <Column
                        title="Nơi sinh"
                        key="placeOfBirth"
                        dataIndex="placeOfBirth"
                        width={180} // Adjusted width
                        align="center"
                    />
                    <Column
                        title="Giới tính"
                        key="isSex"
                        dataIndex="isSex"
                        width={80} // Adjusted width
                        align="center"
                        render={(text) => (text ? 'Nam' : 'Nữ')}
                    />
                    <Column
                        title="Ghi chú"
                        key="note"
                        dataIndex="note"
                        width={150} // Adjusted width
                        align="center"
                    />
                    <Column
                        title="Chức năng"
                        key="action"
                        width={180} // Adjusted width
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
                
                <Pagination
                    align="center"
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
    deleteStaff, // Added deleteStaff to props
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListStaff));
