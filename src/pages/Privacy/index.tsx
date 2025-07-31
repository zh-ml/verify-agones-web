import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

// 样式组件
const PrivacyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space.xl};
  text-align: center;
`;

const LastUpdated = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space.xl};
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.primary};
  margin-top: ${theme.space.xl};
  margin-bottom: ${theme.space.md};
  padding-bottom: ${theme.space.sm};
  border-bottom: 1px solid ${theme.colors.border};
`;

// 未使用的样式组件
/*
const SubsectionTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-top: ${theme.space.lg};
  margin-bottom: ${theme.space.md};
`;
*/

const Paragraph = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: ${theme.space.md};
`;

const List = styled.ul`
  margin-bottom: ${theme.space.md};
  padding-left: ${theme.space.xl};
  
  li {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text.secondary};
    line-height: 1.8;
    margin-bottom: ${theme.space.sm};
  }
`;

const PrivacyPage: React.FC = () => {
  return (
    <PrivacyContainer>
      <PageTitle>隐私政策</PageTitle>
      <LastUpdated>最后更新日期：2023年11月1日</LastUpdated>
      
      <Paragraph>
        TheNinth（以下简称"我们"）非常重视您的隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息，以及您对这些信息所拥有的权利。请您在使用我们的服务前仔细阅读本隐私政策。
      </Paragraph>
      
      <SectionTitle>1. 信息收集</SectionTitle>
      <Paragraph>
        我们可能会收集以下类型的信息：
      </Paragraph>
      <List>
        <li><strong>账户信息</strong>：当您注册账户时，我们会收集您的用户名、电子邮件地址、密码等信息。</li>
        <li><strong>个人资料</strong>：您可以选择提供您的姓名、头像、联系方式等个人资料信息。</li>
        <li><strong>交易信息</strong>：当您购买游戏或服务时，我们会收集与交易相关的信息，包括支付方式、账单地址等。</li>
        <li><strong>服务器信息</strong>：当您使用我们的游戏服务器部署服务时，我们会收集与服务器相关的配置和使用信息。</li>
        <li><strong>使用数据</strong>：我们会自动收集有关您如何使用我们的服务的信息，包括访问时间、浏览页面、停留时间等。</li>
        <li><strong>设备信息</strong>：我们可能会收集您使用的设备信息，包括设备型号、操作系统、浏览器类型、IP地址等。</li>
      </List>
      
      <SectionTitle>2. 信息使用</SectionTitle>
      <Paragraph>
        我们使用收集到的信息用于以下目的：
      </Paragraph>
      <List>
        <li>提供、维护和改进我们的服务</li>
        <li>处理您的交易和请求</li>
        <li>向您发送服务通知和更新</li>
        <li>提供客户支持和响应您的咨询</li>
        <li>分析和监控服务的使用情况</li>
        <li>检测、预防和解决技术问题或安全问题</li>
        <li>根据您的同意，向您发送营销和促销信息</li>
      </List>
      
      <SectionTitle>3. 信息共享</SectionTitle>
      <Paragraph>
        我们不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：
      </Paragraph>
      <List>
        <li><strong>服务提供商</strong>：我们可能会与帮助我们提供服务的第三方服务提供商共享信息，如支付处理商、云服务提供商等。</li>
        <li><strong>业务转让</strong>：如果我们参与合并、收购或资产出售，您的信息可能会作为交易的一部分被转让。</li>
        <li><strong>法律要求</strong>：如果法律要求或为了保护我们的权利、财产或安全，我们可能会披露您的信息。</li>
        <li><strong>征得同意</strong>：在征得您同意的情况下，我们可能会与其他第三方共享您的信息。</li>
      </List>
      
      <SectionTitle>4. 数据安全</SectionTitle>
      <Paragraph>
        我们采取适当的技术和组织措施来保护您的个人信息不被未经授权的访问、使用或披露。这些措施包括但不限于：
      </Paragraph>
      <List>
        <li>使用加密技术保护数据传输和存储</li>
        <li>实施访问控制机制</li>
        <li>定期审查和更新安全措施</li>
        <li>对员工进行数据保护培训</li>
      </List>
      <Paragraph>
        尽管我们努力保护您的信息，但请注意，没有任何安全措施是完全万无一失的。
      </Paragraph>
      
      <SectionTitle>5. 数据保留</SectionTitle>
      <Paragraph>
        我们会在实现本隐私政策中所述目的所必需的时间内保留您的个人信息，除非法律要求或允许更长的保留期限。当不再需要您的个人信息时，我们会安全地删除或匿名化处理这些信息。
      </Paragraph>
      
      <SectionTitle>6. 您的权利</SectionTitle>
      <Paragraph>
        根据适用的数据保护法律，您可能拥有以下权利：
      </Paragraph>
      <List>
        <li><strong>访问权</strong>：您有权获取我们持有的关于您的个人信息的副本。</li>
        <li><strong>更正权</strong>：您有权要求更正不准确或不完整的个人信息。</li>
        <li><strong>删除权</strong>：在某些情况下，您有权要求删除您的个人信息。</li>
        <li><strong>限制处理权</strong>：在某些情况下，您有权要求限制对您个人信息的处理。</li>
        <li><strong>数据可携权</strong>：您有权以结构化、常用和机器可读的格式接收您提供给我们的个人信息，并有权将这些信息传输给另一个控制者。</li>
        <li><strong>反对权</strong>：在某些情况下，您有权反对处理您的个人信息。</li>
        <li><strong>撤回同意权</strong>：如果我们基于您的同意处理个人信息，您有权随时撤回该同意。</li>
      </List>
      <Paragraph>
        如果您想行使这些权利，请通过本政策末尾提供的联系方式与我们联系。
      </Paragraph>
      
      <SectionTitle>7. Cookie和类似技术</SectionTitle>
      <Paragraph>
        我们使用Cookie和类似技术来收集和存储有关您使用我们服务的信息。Cookie是存储在您设备上的小型数据文件，帮助我们提供更好的用户体验、分析服务使用情况和优化网站功能。
      </Paragraph>
      <Paragraph>
        您可以通过浏览器设置控制Cookie的使用，包括删除现有Cookie或阻止新Cookie的设置。但请注意，禁用Cookie可能会影响我们服务的某些功能。
      </Paragraph>
      
      <SectionTitle>8. 儿童隐私</SectionTitle>
      <Paragraph>
        我们的服务不面向16岁以下的儿童。我们不会故意收集16岁以下儿童的个人信息。如果您是父母或监护人，并且您认为您的孩子向我们提供了个人信息，请联系我们，我们将采取措施删除这些信息。
      </Paragraph>
      
      <SectionTitle>9. 第三方链接</SectionTitle>
      <Paragraph>
        我们的服务可能包含指向第三方网站或服务的链接。我们对这些第三方的隐私做法或内容不负责任。我们建议您在提供个人信息之前阅读这些第三方的隐私政策。
      </Paragraph>
      
      <SectionTitle>10. 隐私政策的变更</SectionTitle>
      <Paragraph>
        我们可能会不时更新本隐私政策。当我们进行重大变更时，我们会在网站上发布更新后的政策，并在适当的情况下通知您。我们鼓励您定期查看本政策，以了解我们如何保护您的信息。
      </Paragraph>
      
      <SectionTitle>11. 联系我们</SectionTitle>
      <Paragraph>
        如果您对本隐私政策有任何疑问、意见或请求，请通过以下方式联系我们：
      </Paragraph>
      <Paragraph>
        <strong>电子邮件</strong>：privacy@theninth.com<br />
        <strong>地址</strong>：中国广东省深圳市南山区科技园南区科技南十二路2号金蝶软件园B栋10层<br />
        <strong>电话</strong>：+86 400-123-4567
      </Paragraph>
      <Paragraph>
        我们会在收到您的请求后30天内回复。
      </Paragraph>
    </PrivacyContainer>
  );
};

export default PrivacyPage;