/**
 * 旅游经历页面
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl};
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.textSecondary};
`;

const TravelPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle>旅游经历 🌍</PageTitle>
      <ComingSoon>
        🚧 3D地球组件开发中...
        <br />
        即将展示我的旅游足迹！
      </ComingSoon>
    </PageContainer>
  );
};

export default TravelPage;