import React, { useState } from "react";
import { Layout, Button, Modal, Form, Input, Typography, Carousel } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginOpen(false);
    navigate("/home"); // Login ayyaka homepage ki pampistundi
  };

  return (
    <Layout className="dream6-layout">
      {/* HEADER */}
      <Header className="dream6-header">
        <div className="logo">Dream-Hit</div>
        <div className="header-actions">
          <Button
            className="yellow-btn"
            size="small"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </Button>
          <Button
            className="yellow-btn-outline"
            size="small"
            onClick={() => setSignupOpen(true)}
          >
            Signup
          </Button>
        </div>
      </Header>

      {/* BODY */}
      <Content className="dream6-content">
        {/* Banner Carousel */}
        <Carousel autoplay dots>
          <div className="banner">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D12AQH_jursLbsLiQ/article-cover_image-shrink_720_1280/B4DZY9gX_vHIAM-/0/1744788620326?e=2147483647&v=beta&t=e1MKloQZpnr0P3IiVi_9sQmqA_pY3qWiCN5Eo3HfW2c"
              alt="banner1"
            />
          </div>
          <div className="banner">
            <img
              src="https://media.sportstiger.com/media/odi-wc-team-india-sportstiger-1693901800960-original.jpg"
              alt="banner2"
            />
          </div>
          <div className="banner">
            <img
              src="https://e0.365dm.com/21/07/2048x1152/skysports-the-hundred-jos-buttler_5453447.jpg?20210721135940"
              alt="banner3"
            />
          </div>
        </Carousel>

        {/* Why play only Dream6? */}
        <div className="why-dream6">
          <Title level={4}>Why play only Dream-Hit?</Title>
          <Paragraph>
            Dream-Hit is a trusted fantasy cricket platform providing smooth user
            experience, secure wallet, and real-time matches. Play, win, and
            enjoy the thrill like never before!
          </Paragraph>
        </div>

        <div className="contact-banner">
          <img
            src="https://en.fxgaininfo.com/wp-content/uploads/2024/01/Withdraw-able-Forex-web-1200x600.webp"
            alt="contact-banner"
          />
        </div>

        {/* Contact Section */}
        <div className="contact">
          <p>
            <WhatsAppOutlined
              style={{ fontSize: 18, color: "#25D366", marginRight: 6 }}
            />
            WhatsApp: +91 9876543210
          </p>
          <p>Email: dreamhithelp@example.com</p>
        </div>
      </Content>

      {/* FOOTER */}
      <Footer className="dream6-footer">
        All rights reserved © 2025 dream6.clubofficial@gmail.com
      </Footer>

      {/* LOGIN MODAL */}
      <Modal
        open={loginOpen}
        onCancel={() => setLoginOpen(false)}
        footer={null}
        centered
        title={null}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Login Now</h2>
        </div>

        <Form>
          <Form.Item name="user" style={{ marginBottom: 16 }}>
            <Input
              placeholder="Username / Mobile Number"
              bordered={false}
              style={{
                borderBottom: "1px solid #f5c518",
                marginTop: 10,
              }}
            />
          </Form.Item>

          <Form.Item name="password" style={{ marginBottom: 16 }}>
            <Input.Password
              placeholder="Password"
              bordered={false}
              style={{
                borderBottom: "1px solid #f5c518",
                marginTop: 10,
              }}
            />
          </Form.Item>

          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <Button
              type="link"
              onClick={() => {
                setForgotOpen(true);
                setLoginOpen(false);
              }}
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            block
            onClick={handleLogin}
            style={{
              margin: "16px 0",
              background: "#f5c518",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Login Now
          </Button>

          <div style={{ textAlign: "center", marginBottom: 8 }}>
            Don’t have an account?{" "}
            <Button
              type="link"
              onClick={() => {
                setSignupOpen(true);
                setLoginOpen(false);
              }}
            >
              Signup
            </Button>
          </div>

          <div style={{ textAlign: "center", fontSize: 12 }}>
            support@dream6mail.com
          </div>
        </Form>
      </Modal>

      {/* SIGNUP MODAL */}
      <Modal
        open={signupOpen}
        onCancel={() => setSignupOpen(false)}
        footer={null}
        centered
        title={<div style={{ textAlign: "center" }}>Dream6 Signup</div>}
      >
        <div style={{ textAlign: "center" }}>
          <p>For ID please contact WhatsApp number</p>
          <WhatsAppOutlined style={{ fontSize: 24, color: "green" }} /> +91
          9876543210
        </div>
      </Modal>

      {/* FORGOT PASSWORD MODAL */}
      <Modal
        open={forgotOpen}
        onCancel={() => setForgotOpen(false)}
        footer={null}
        centered
        title={<div style={{ textAlign: "center" }}>Forgot Password</div>}
      >
        <div style={{ textAlign: "center" }}>
          <p>For password please contact WhatsApp number:</p>
          <WhatsAppOutlined style={{ fontSize: 24, color: "green" }} /> +91
          9123456789
        </div>
      </Modal>
    </Layout>
  );
}
