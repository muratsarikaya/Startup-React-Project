import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {
    Layout,
    Breadcrumb,
    Steps,
    Button,
    message,
    Row,
    Col,
    InputNumber,
    Tooltip,
    Image,
    Result,
    Form,
    Input,
    Select
} from 'antd';
import {MinusOutlined, PlusOutlined, DeleteOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {useBasket} from "../contextApi/BasketContext";
import RemoveBasketMessage from "../components/messages/RemoveBasketMessage";
import styles from "../assets/css/global.css"


const {Header, Content, Footer} = Layout;
const {Step} = Steps;
const {Option} = Select;

const CartPage = () => {
    const {basket, removeProduct, addBasket, decreaseProduct} = useBasket();
    const [current, setCurrent] = useState(0);

    const removeProductFromCart = (product) => {
        removeProduct(product)
    };
    const increaseProductGty = (product) => {
        addBasket(product)
    };
    const decreaseProductGty = (product) => {
        decreaseProduct(product)
    };
    const cartDiv = (
        <>
            {
                basket.map(product => (
                    <Row className="align-items-center" style={{margin: "50px 0"}}>
                        <Col xs={8}>
                            <div className="d-flex">
                                <Image
                                    width={80}
                                    src={product.image_url}

                                />
                                <div style={{marginLeft: "30px"}}>
                                    <div>{product.product_name}</div>
                                    <div>Fiyat: {product.price} ₺</div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className="d-flex justify-content-center">
                                <Button type="primary" danger ghost onClick={() => decreaseProductGty(product)}
                                        className="d-flex justify-content-center align-items-center">
                                    <MinusOutlined/>
                                </Button>
                                <InputNumber readonly="true" min={1} max={10} defaultValue={1} style={{width: "40px"}}
                                             value={product.gty}/>
                                <Button type="primary" ghost onClick={() => increaseProductGty(product)}
                                        className="d-flex justify-content-center align-items-center">
                                    <PlusOutlined/>
                                </Button>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="text-center" style={{marginRight: "30px"}}>{product.price} ₺</div>
                                <RemoveBasketMessage product={product}
                                                     deleteHandle={() => removeProductFromCart(product)}
                                ></RemoveBasketMessage>
                            </div>

                        </Col>
                    </Row>
                ))
            }
            {<>
                <hr/>
                <div className="mb-5" style={{fontSize: "25px", textAlign: "right", paddingRight: "90px"}}>
                    Toplam
                    Tutar: {basket.length > 0 && basket.map((product) => (product.price * product.gty)).reduce((previousValue, currentValue) => previousValue + currentValue)}
                </div>
            </>
            }

        </>
    );
    const infoDiv = (
        <>
            <Form
            >
                <Row>
                    <Col span={6} offset={4}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_name"
                            label="Adı"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={3}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_lastname"
                            label="Soyadı"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={4}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_email"
                            label="E-Posta Adresi"
                            rules={[
                                {
                                    required: true,
                                    message: 'E-Posta Zorunludur!',
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={3}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_phone"
                            label="Telefon Numarası"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required!',
                                },
                            ]}
                        >
                            <InputNumber style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={4}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_country"
                            label="Ülke"
                            rules={[
                                {
                                    required: true,
                                    message: 'E-Posta Zorunludur!',
                                },
                            ]}
                        >
                            <Select defaultValue="Seçiniz" style={{ width: 120 }} allowClear>
                                <Option value="Türkiye">Türkiye</Option>
                                <Option value="Almanya">Almanya</Option>
                                <Option value="İngiltere">İngiltere</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4} offset={1}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_city"
                            label="Şehir"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required!',
                                },
                            ]}
                        >
                            <Select defaultValue="Seçiniz" style={{ width: 120 }} allowClear>
                                <Option value="İstanbul">İstanbul</Option>
                                <Option value="Antalya">Antalya</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4} offset={1}>
                        <Form.Item
                            className="antFormItemLabel"
                            style={{flexDirection:"column", justifyContent:"start", textAlign:"left"}}
                            name="person_zipcode"
                            label="Posta Kodu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required!',
                                },
                            ]}
                        >
                            <InputNumber style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

        </>
    )
    const steps = [
        {
            title: '01.Sepetim',
            content: cartDiv,
        },
        {
            title: '02.Bilgiler',
            content: infoDiv,
        },
        {
            title: '03.Ödeme',
            content: 'Second-content',
        },
        {
            title: '04.Tamamlandı',
            content: 'Last-content',
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <Layout className="layout">
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        {
                            basket.length === 0 ? (
                                <div>
                                    <div className="text-center"><ShoppingCartOutlined style={{
                                        fontSize: "50px",
                                        padding: "30px",
                                        background: "#faad14",
                                        color: "#fff",
                                        borderRadius: "50%"
                                    }}/></div>
                                    <div className="text-center mt-4">
                                        <h1>Sepetiniz Boş !</h1>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Button type="primary"
                                                style={{background: "#faad14", borderColor: "#faad14"}}>
                                            <Link to="/" style={{textDecoration: "none"}}> Alışverişe Başla </Link>
                                        </Button>

                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Steps current={current}>
                                        {steps.map(item => (
                                            <Step key={item.title} title={item.title}/>
                                        ))}
                                    </Steps>
                                    <div className="steps-content">{steps[current].content}</div>

                                    <div className="steps-action">
                                        {current < steps.length - 1 && (
                                            <div className="d-flex justify-content-between">
                                                <Button type="primary"
                                                        style={{background: "#6c757d", borderColor: "#6c757d"}}>
                                                    <Link to="/product-list" style={{textDecoration: "none"}}>Alışverişe
                                                        Devam Et</Link>
                                                </Button>
                                                <Button type="primary" onClick={() => next()}>
                                                    Devam
                                                </Button>
                                            </div>
                                        )}
                                        {current === steps.length - 1 && (
                                            <Button type="primary"
                                                    onClick={() => message.success('Processing complete!')}>
                                                Done
                                            </Button>
                                        )}
                                        {current > 0 && (
                                            <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                                                Previous
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )
                        }

                    </div>
                </Content>

            </Layout>,
        </>
    );
}

export default CartPage;
