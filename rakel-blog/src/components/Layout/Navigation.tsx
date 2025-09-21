import React from 'react';
import styled from 'styled-components';
import { navigationItems } from '../../data/navigation';
import { theme } from '../../styles/theme';

const NavContainer = styled.nav`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.md} 0;
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${props => props.active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: ${theme.fontSizes.md};
  transition: all 0.3s ease;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  
  &:hover {
    color: ${theme.colors.primary};
    background-color: rgba(0, 102, 204, 0.1);
  }
`;

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  return (
    <NavContainer>
      <NavList>
        {navigationItems.map(item => (
          <NavItem key={item.id}>
            <NavLink
              href={item.path}
              active={currentPath === item.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
            >
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default Navigation;