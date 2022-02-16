import React, {useState} from 'react';
import{Link} from "react-router-dom";
import {Layout, Breadcrumb, Steps, Button, message, Row, Col, InputNumber, Tooltip, Image, Result} from 'antd';
import {MinusOutlined, PlusOutlined, DeleteOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {useBasket} from "../contextApi/BasketContext";


const {Header, Content, Footer} = Layout;
const {Step} = Steps;

const CartPage = () => {
    const {basket} = useBasket();
    const [current, setCurrent] = useState(0);

    const cartDiv = (
        <>{
            basket.map(product => (
                <Row className="align-items-center" style={{margin: "50px 0"}}>
                    <Col xs={8}>
                        <div className="d-flex">
                            <Image
                                width={80}
                                src={product.image_url}

                            />
                            <div style={{marginLeft:"30px"}}>
                                <div>{product.product_name}</div>
                                <div>Fiyat: {product.price} ₺</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="d-flex justify-content-center">
                            <Button type="primary" danger ghost className="d-flex justify-content-center align-items-center">
                                <MinusOutlined/>
                            </Button>
                            <InputNumber min={1} max={10} defaultValue={1} style={{width: "40px"}} value={product.gty}/>
                            <Button type="primary" ghost className="d-flex justify-content-center align-items-center">
                                <PlusOutlined/>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="text-center" style={{marginRight: "30px"}}>{product.price} ₺</div>
                            <Tooltip title="Sil">
                                <Button type="primary" danger icon={<DeleteOutlined/>}/>
                            </Tooltip>
                        </div>

                    </Col>
                </Row>
            ))
        }

        </>


    );
    const steps = [
        {
            title: '01.Sepetim',
            content: cartDiv,
        },
        {
            title: '02.Ödeme',
            content: 'Second-content',
        },
        {
            title: '03.Kargo',
            content: 'Last-content',
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
                                    <div className="text-center"><ShoppingCartOutlined style={{    fontSize: "50px",
                                        padding: "30px",
                                        background: "#faad14",
                                        color: "#fff",
                                        borderRadius: "50%"}} /></div>
                                    <div className="text-center mt-4">
                                        <h1>Sepetiniz Boş !</h1>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Button type="primary" style={{background: "#faad14", borderColor: "#faad14"}}>
                                            <Link to="/" style={{textDecoration:"none"}}> Alışverişe Başla </Link>
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
                                                <Button type="primary" style={{background:"#6c757d", borderColor:"#6c757d"}}>
                                                    <Link to="/product-list" style={{textDecoration:"none"}}>Alışverişe Devam Et</Link>
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
