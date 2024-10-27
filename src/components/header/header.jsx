import { Flex,Layout } from "antd";
import DynamicDashboard from "../../Dashbord";


const { Header,  Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  fontSize: '40px', 
  fontWeight: 'bold',
};
const contentStyle = {
//   textAlign: 'center',
//   minHeight: 120,
  lineHeight: '20px',
  color: 'black',
  backgroundColor: '#f4f4f4',
};
const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 40px)',  
  height: 'calc(100vh - 40px)', 
  margin: '0px 20px 20px 20px',  
  overflow: 'auto',
  backgroundColor: '#d0caca'

};

const HeaderNav = () => {
  return (
    <div>
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Electric Vehicle Dashbord</Header>
      <Content style={contentStyle}><DynamicDashboard/></Content>
    </Layout>

  </Flex>
    </div>
  )
}

export default HeaderNav;
