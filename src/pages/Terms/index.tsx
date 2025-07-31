import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Link } from 'react-router-dom';

// 样式组件
const TermsContainer = styled.div`
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

const StyledLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TermsPage: React.FC = () => {
  return (
    <TermsContainer>
      <PageTitle>服务条款</PageTitle>
      <LastUpdated>最后更新日期：2023年11月1日</LastUpdated>
      
      <Paragraph>
        欢迎使用TheNinth提供的服务。本服务条款（"条款"）是您与TheNinth（"我们"、"我们的"或"TheNinth"）之间就使用我们的网站、产品和服务达成的协议。请您在使用我们的服务前仔细阅读本条款。
      </Paragraph>
      
      <Paragraph>
        通过访问或使用我们的服务，您确认您已阅读、理解并同意受本条款的约束。如果您不同意本条款的任何部分，请不要使用我们的服务。
      </Paragraph>
      
      <SectionTitle>1. 服务描述</SectionTitle>
      <Paragraph>
        TheNinth提供游戏服务器部署和游戏销售平台服务，允许用户购买游戏、部署和管理游戏服务器。我们可能会不时更新、更改或暂停任何服务，恕不另行通知。
      </Paragraph>
      
      <SectionTitle>2. 账户注册与安全</SectionTitle>
      <Paragraph>
        2.1 为使用我们的某些服务，您可能需要创建一个账户。您同意提供准确、完整和最新的信息，并在信息变更时及时更新。
      </Paragraph>
      <Paragraph>
        2.2 您负责维护您账户的保密性，并对发生在您账户下的所有活动负全部责任。如果您发现任何未经授权使用您账户的情况，请立即通知我们。
      </Paragraph>
      <Paragraph>
        2.3 我们保留拒绝服务、终止账户、删除或编辑内容或取消订单的权利，恕不另行通知。
      </Paragraph>
      
      <SectionTitle>3. 用户行为</SectionTitle>
      <Paragraph>
        3.1 您同意不会使用我们的服务进行任何违法或未经授权的活动，包括但不限于：
      </Paragraph>
      <List>
        <li>违反任何适用的法律、法规或规章</li>
        <li>侵犯他人的知识产权、隐私权或其他权利</li>
        <li>传播恶意软件、病毒或其他有害代码</li>
        <li>干扰或破坏服务或连接到服务的服务器和网络</li>
        <li>尝试未经授权访问我们的系统或其他用户的账户</li>
        <li>使用服务进行欺诈、欺骗或其他不当行为</li>
      </List>
      <Paragraph>
        3.2 您理解并同意，如果您违反本条款，我们可能会立即终止您的账户和服务访问权限，并可能采取适当的法律行动。
      </Paragraph>
      
      <SectionTitle>4. 游戏购买与退款</SectionTitle>
      <Paragraph>
        4.1 通过我们的平台购买游戏时，您确认您已满足购买该游戏的年龄要求，并且您有权在您所在的地区购买和使用该游戏。
      </Paragraph>
      <Paragraph>
        4.2 所有游戏销售均为最终销售，除非适用法律另有规定或我们的退款政策允许。我们的退款政策可能会根据游戏、购买时间和其他因素而有所不同。
      </Paragraph>
      <Paragraph>
        4.3 在某些情况下，如游戏存在重大技术问题或与描述严重不符，我们可能会提供退款。退款请求将根据具体情况进行评估。
      </Paragraph>
      
      <SectionTitle>5. 服务器部署与使用</SectionTitle>
      <Paragraph>
        5.1 我们提供游戏服务器部署服务，允许您在我们的基础设施上部署和管理游戏服务器。
      </Paragraph>
      <Paragraph>
        5.2 您同意不会使用我们的服务器部署服务进行任何违法或未经授权的活动，包括但不限于托管侵犯版权的内容、进行网络攻击或运行未经授权的服务。
      </Paragraph>
      <Paragraph>
        5.3 我们保留监控服务器使用情况的权利，以确保遵守本条款和适用法律。如发现违规行为，我们可能会暂停或终止您的服务器，恕不另行通知。
      </Paragraph>
      <Paragraph>
        5.4 您理解并同意，服务器性能可能会受到多种因素的影响，包括但不限于网络条件、硬件限制和同时使用的用户数量。我们不保证服务器将始终无中断或无错误地运行。
      </Paragraph>
      
      <SectionTitle>6. 付款与订阅</SectionTitle>
      <Paragraph>
        6.1 使用我们的某些服务可能需要付款。所有价格均以人民币计价，除非另有说明。
      </Paragraph>
      <Paragraph>
        6.2 您同意支付与您账户相关的所有费用，并授权我们向您指定的支付方式收取费用。
      </Paragraph>
      <Paragraph>
        6.3 对于订阅服务，除非您在下一个计费周期开始前取消订阅，否则我们将自动向您收取下一个计费周期的费用。
      </Paragraph>
      <Paragraph>
        6.4 如果我们无法成功向您的支付方式收费，我们可能会暂停或终止您的服务访问权限，直到付款问题得到解决。
      </Paragraph>
      
      <SectionTitle>7. 知识产权</SectionTitle>
      <Paragraph>
        7.1 我们的服务和内容（包括但不限于文本、图形、徽标、图标、图像、音频剪辑、下载、数据编译和软件）是TheNinth或其许可方的财产，受版权、商标和其他知识产权法律的保护。
      </Paragraph>
      <Paragraph>
        7.2 我们授予您有限的、非排他性的、不可转让的许可，允许您访问和使用我们的服务，仅用于个人、非商业目的。
      </Paragraph>
      <Paragraph>
        7.3 未经我们明确书面许可，您不得复制、修改、创建衍生作品、公开展示、公开表演、重新发布、下载、存储或传输我们服务中的任何内容。
      </Paragraph>
      
      <SectionTitle>8. 免责声明</SectionTitle>
      <Paragraph>
        8.1 我们的服务按"现状"和"可用"的基础提供，不附带任何形式的明示或暗示保证。
      </Paragraph>
      <Paragraph>
        8.2 在法律允许的最大范围内，TheNinth明确否认所有明示或暗示的保证，包括但不限于适销性、特定用途适用性和非侵权的暗示保证。
      </Paragraph>
      <Paragraph>
        8.3 我们不保证服务将满足您的要求，或者服务将不间断、及时、安全或无错误，或者错误将被纠正。
      </Paragraph>
      
      <SectionTitle>9. 责任限制</SectionTitle>
      <Paragraph>
        9.1 在法律允许的最大范围内，TheNinth及其董事、员工、代理人、关联公司和合作伙伴对任何直接、间接、附带、特殊、后果性或惩罚性损害不承担责任，包括但不限于利润损失、商誉损失、数据损失或其他无形损失。
      </Paragraph>
      <Paragraph>
        9.2 在任何情况下，我们对您的总责任不超过您在引起索赔的事件发生前12个月内为使用我们的服务而支付给我们的金额。
      </Paragraph>
      
      <SectionTitle>10. 赔偿</SectionTitle>
      <Paragraph>
        您同意赔偿、辩护并使TheNinth及其董事、员工、代理人、关联公司和合作伙伴免受因您违反本条款、您使用我们的服务或您违反任何法律或第三方权利而产生的任何索赔、损失、责任、费用和开支（包括合理的律师费）。
      </Paragraph>
      
      <SectionTitle>11. 条款修改</SectionTitle>
      <Paragraph>
        我们保留随时修改本条款的权利。修改后的条款将在我们的网站上发布，并在发布时立即生效。您继续使用我们的服务将被视为接受修改后的条款。我们建议您定期查看本条款以了解任何变更。
      </Paragraph>
      
      <SectionTitle>12. 终止</SectionTitle>
      <Paragraph>
        12.1 您可以随时停止使用我们的服务或通过联系我们关闭您的账户来终止本协议。
      </Paragraph>
      <Paragraph>
        12.2 如果您违反本条款的任何规定，我们可能会暂停或终止您的账户和服务访问权限，恕不另行通知。
      </Paragraph>
      <Paragraph>
        12.3 终止后，您访问我们服务的权利将立即停止。本条款中在性质上应当继续有效的条款将在终止后继续有效。
      </Paragraph>
      
      <SectionTitle>13. 适用法律与争议解决</SectionTitle>
      <Paragraph>
        13.1 本条款受中华人民共和国法律管辖，不考虑冲突法原则。
      </Paragraph>
      <Paragraph>
        13.2 因本条款引起的或与之相关的任何争议，双方应首先尝试通过友好协商解决。如果在协商开始后30天内未能解决争议，任何一方均可将争议提交至有管辖权的人民法院解决。
      </Paragraph>
      
      <SectionTitle>14. 其他条款</SectionTitle>
      <Paragraph>
        14.1 本条款构成您与TheNinth之间关于使用我们服务的完整协议，并取代所有先前或同时期的通信和提议，无论是口头还是书面的。
      </Paragraph>
      <Paragraph>
        14.2 如果本条款的任何条款被认定为无效或不可执行，该条款将被视为可分割的，不影响其余条款的有效性和可执行性。
      </Paragraph>
      <Paragraph>
        14.3 我们未能执行本条款的任何权利或规定不构成对该权利或规定的放弃。
      </Paragraph>
      <Paragraph>
        14.4 您不得转让本条款下的权利或义务，未经我们事先书面同意，任何尝试转让均为无效。我们可以自由转让本条款下的权利和义务。
      </Paragraph>
      
      <SectionTitle>15. 联系我们</SectionTitle>
      <Paragraph>
        如果您对本服务条款有任何疑问或意见，请通过以下方式联系我们：
      </Paragraph>
      <Paragraph>
        <strong>电子邮件</strong>：terms@theninth.com<br />
        <strong>地址</strong>：中国广东省深圳市南山区科技园南区科技南十二路2号金蝶软件园B栋10层<br />
        <strong>电话</strong>：+86 400-123-4567
      </Paragraph>
      
      <Paragraph>
        感谢您阅读我们的服务条款。通过使用我们的服务，您确认您已阅读并同意受本条款的约束。
      </Paragraph>
      
      <Paragraph>
        请同时查看我们的<StyledLink to="/privacy">隐私政策</StyledLink>，了解我们如何收集、使用和保护您的个人信息。
      </Paragraph>
    </TermsContainer>
  );
};

export default TermsPage;