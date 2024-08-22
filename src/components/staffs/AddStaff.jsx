import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import { Col, Divider, Row, Form, Input, Select, Button, Upload, DatePicker } from 'antd';
import ContentHeader from '../common/ContentHeader';
import { connect } from 'react-redux';
import { insertStaff } from '../../redux/actions/staffAction';
import { IoCloudUploadOutline } from 'react-icons/io5';
import axios from 'axios';

class AddStaff extends Component {
    state = {
        fileList: [],
        units: [], // Store units fetched from the API
    };

    componentDidMount() {
        // Fetch units from the API
        axios.get('http://192.168.6.16:45455/api/Unit')
            .then(response => {
                // Extract the items array from the API response
                this.setState({ units: response.data.items });
            })
            .catch(error => {
                console.error('There was an error fetching the units!', error);
            });
    }

    onSubmitForm = (values) => {
        console.log(values);

        const { navigate } = this.props.router;

        const formData = new FormData();
        formData.append('ImageFiles', values.ImageFiles);
        formData.append('UserName', values.UserName);
        formData.append('Unit_id', values.Unit_id);
        formData.append('DateOfBirth', values.DateOfBirth.format('YYYY/MM/DD'));
        formData.append('PlaceOfBirth', values.PlaceOfBirth);
        formData.append('IsSex', values.IsSex ? 'true' : 'false');
        formData.append('Note', values.Note);

        if (this.state.fileList.length > 0) {
            formData.append('ImageFiles', this.state.fileList[0].originFileObj);
        }

        this.props.insertStaff(formData, navigate);
    };

    handleUploadChange = ({ fileList }) => {
        this.setState({ fileList });
    };

    render() {
        const { navigate } = this.props.router;
        const { fileList, units } = this.state;

        return (
            <div>
                <ContentHeader
                    navigate={navigate}
                    title="Thêm cán bộ"
                    className="site-page-header"
                ></ContentHeader>

                <Form layout="vertical" className="form" onFinish={this.onSubmitForm}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Mã cán bộ" name="id">
                                <Input readOnly></Input>
                            </Form.Item>

                            <Form.Item
                                label="Hình ảnh"
                                name="ImageFiles"
                                rules={[{ required: true, message: 'Vui lòng tải ảnh lên!' }]}
                            >
                                <Upload
                                    name="ImageFiles"
                                    listType="picture"
                                    fileList={fileList}
                                    onChange={this.handleUploadChange}
                                    beforeUpload={() => false}
                                >
                                    <Button icon={<IoCloudUploadOutline />}>Tải hình ảnh</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                label="Họ và tên"
                                name="UserName"
                                rules={[{ required: true, min: 2, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input></Input>
                            </Form.Item>

                            <Form.Item
                                label="Đơn vị"
                                name="Unit_id"
                                rules={[{ required: true, message: 'Vui lòng chọn đơn vị!' }]}
                            >
                                <Select placeholder="Chọn đơn vị">
                                    {units.map((unit) => (
                                        <Select.Option key={unit.id} value={unit.id}>
                                            {unit.userName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Ngày sinh"
                                name="DateOfBirth"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                            >
                                <DatePicker format="YYYY/MM/DD" placeholder="Chọn ngày sinh" />
                            </Form.Item>

                            <Form.Item 
                                label="Nơi sinh" 
                                name="PlaceOfBirth"
                                rules={[{ required: true, message: 'Vui lòng nhập nơi sinh!' }]}
                            >
                                <Input></Input>
                            </Form.Item>

                            <Form.Item
                                label="Giới tính"
                                name="IsSex"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Select.Option value="true">Nam</Select.Option>
                                    <Select.Option value="false">Nữ</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Ghi chú" name="Note">
                                <Input></Input>
                            </Form.Item>

                            <Divider></Divider>
                            <Button htmlType="submit" type="primary" style={{ float: 'right' }}>
                                Lưu
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    staff: state.staffReducer.staff,
});

const mapDispatchToProps = {
    insertStaff,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddStaff));
