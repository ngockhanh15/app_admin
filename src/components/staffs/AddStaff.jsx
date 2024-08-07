import React, { Component } from 'react';
import withRouter from '../../helpers/withRouter';
import { Col, Divider, Row, Form, Input, Select, Button} from 'antd';
import ContentHeader from '../common/ContentHeader';

class AddStaff extends Component {
    onSubmitForm = (values) => {
        console.log(values);
    };
    render(){
        const {navigate} = this.props.router;
        return(
            <div>
                <ContentHeader 
                navigate={navigate} 
                title="Thêm cán bộ" 
                className="site-page-header"
                ></ContentHeader>
                
                <Form layout='vertical' className='form' onFinish={this.onSubmitForm}>
                    <Row>
                        <Col md={12}>
                        <Form.Item label="Mã cán bộ" name="id">
                            <Input readOnly></Input>
                        </Form.Item>
                        <Form.Item 
                        label="Họ và tên" 
                        name="name" 
                        rules={[{required: true, min: 2}]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item 
                        label="Đơn vị" 
                        name="unit"
                        rules={[{required: true, min: 2}]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="Ngày sinh" name="birthday">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="Nơi sinh" name="born">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item 
                        label="Giới tính" 
                        name="sex" 
                        rules={[{required: true, min: 2}]}
                        >
                            <Select defaultValue="--Chọn giới tính--">
                                <Select.Option value="0">Nam</Select.Option>
                                <Select.Option value="1">Nữ</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Ghi chú" name="note">
                            <Input></Input>
                        </Form.Item>

                        <Divider></Divider>
                        <Button htmlType='submit' type='primary' style={{float: 'right'}}>
                            Lưu
                        </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default withRouter(AddStaff);