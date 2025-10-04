import React, { useState, useEffect } from "react";
import { Layout, Button, Modal, Form, Input, Typography, Carousel } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LandingPage.scss";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
  }, []);

  // 🔑 LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/users/login", {
        username: loginUsername,
        password: loginPassword,
      });

      const user = res.data;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setCurrentUser(user);
        setLoginOpen(false);
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error, try again later");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <Layout className="dream6-layout">
      {/* HEADER */}
      <Header className="dream6-header">
        <div className="logo">Dream-Hit</div>
        <div className="header-actions">
          {currentUser ? (
            <>
              <span style={{ color: "#fff", marginRight: 12 }}>
                {currentUser.username}
              </span>
              <Button className="yellow-btn-outline" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="yellow-btn" size="small" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
              <Button className="yellow-btn-outline" size="small" onClick={() => setSignupOpen(true)}>
                Signup
              </Button>
            </>
          )}
        </div>
      </Header>

      {/* BODY */}
      <Content className="dream6-content">
        <Carousel autoplay dots>
          <div className="banner">
            <img src="https://media.licdn.com/dms/image/v2/D4D12AQH_jursLbsLiQ/article-cover_image-shrink_720_1280/B4DZY9gX_vHIAM-/0/1744788620326?e=2147483647&v=beta&t=e1MKloQZpnr0P3IiVi_9sQmqA_pY3qWiCN5Eo3HfW2c" alt="banner1" />
          </div>
          <div className="banner">
            <img src="https://media.sportstiger.com/media/odi-wc-team-india-sportstiger-1693901800960-original.jpg" alt="banner2" />
          </div>
          <div className="banner">
            <img src="https://e0.365dm.com/21/07/2048x1152/skysports-the-hundred-jos-buttler_5453447.jpg?20210721135940" alt="banner3" />
          </div>
        </Carousel>

        <div className="why-dream6">
          <Title level={4}>Why play only Dream-Hit?</Title>
          <Paragraph>
            Dream-Hit is a trusted fantasy cricket platform providing smooth user experience, secure wallet, and real-time matches.
          </Paragraph>
        </div>

        <div className="contact-banner">
          <img src="https://en.fxgaininfo.com/wp-content/uploads/2024/01/Withdraw-able-Forex-web-1200x600.webp" alt="contact-banner" />
        </div>

        <div className="contact">
          <p>
            <WhatsAppOutlined style={{ fontSize: 18, color: "#25D366", marginRight: 6 }} />
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
      <Modal open={loginOpen} onCancel={() => setLoginOpen(false)} footer={null} centered title={null}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Login Now</h2>
        </div>

        <Form className="form-underline">
          <Form.Item style={{ marginBottom: 16 }}>
            <Input
              placeholder="Username / Mobile Number"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Input.Password
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Form.Item>

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
        </Form>
      </Modal>

      {/* SIGNUP MODAL */}
      <Modal open={signupOpen} onCancel={() => setSignupOpen(false)} footer={null} centered title="Dream-Hit Signup">
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p>For an account, please contact the admin via WhatsApp:</p>
          <WhatsAppOutlined style={{ fontSize: 24, color: "green" }} /> +91 9876543210
        </div>
      </Modal>
    </Layout>
  );
}
