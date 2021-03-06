import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Link } from "gatsby";
import BlogConfig from "../../../../blog-config";
import { FiFolder, FiMoon, FiSun } from "react-icons/fi";

type HeaderWrapperProps = {
  isHidden: boolean;
};

const HeaderWrapper = styled.header<HeaderWrapperProps>`
  display: block;
  position: fixed;
  top: ${(props) => (props.isHidden ? -60 : 0)}px;
  left: 0;
  right: 0;
  padding: 40px;
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transition: top 0.5s, opacity 0.5s;
  z-index: 999;

  @media (max-width: 768px) {
    padding: 16px 16px;
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 680px;
  margin: 0 auto;
`;

const BlogLogo = styled.img`
  width: 28px;
  height: 28px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    cursor: pointer;
    stroke-width: 1px;
    stroke: ${(props) => props.theme.colors.primary};
  }

  & svg path {
    transition: fill 0.3s;
  }

  & svg:hover path {
    stroke: ${(props) => props.theme.colors.primary};
  }
`;

const ToggleWrapper = styled.div`
  width: 20px;
  height: 24px;
  margin-right: 15px;
  overflow: hidden;
  box-sizing: border-box;
`;

const IconRail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  top: ${(props) => (props.theme.name === "light" ? "-19px" : "0px")};
  transition: top 0.4s;

  & > svg {
    transition: opacity 0.25s;
  }

  & > svg:first-child {
    opacity: ${(props) => (props.theme.name === "light" ? 0 : 1)};
  }

  & > svg:last-child {
    opacity: ${(props) => (props.theme.name === "dark" ? 0 : 1)};
  }
`;

const profileImageRoot =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : BlogConfig.siteUrl;

type Props = {
  toggleTheme: () => void;
};

const Header = ({ toggleTheme }: Props) => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState<number>(0);
  const [hidden, setHidden] = useState(false);

  const detectScrollDirection = () => {
    if (scrollY >= window.scrollY) {
      // scroll up
      setHidden(false);
    } else if (scrollY < window.scrollY && 400 <= window.scrollY) {
      // scroll down
      setHidden(true);
    }

    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", detectScrollDirection);

    return () => {
      window.removeEventListener("scroll", detectScrollDirection);
    };
  }, [scrollY]);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  return (
    <HeaderWrapper isHidden={hidden}>
      <Inner>
        <Link to="/">
          <BlogLogo src={`${profileImageRoot}/favicon.png`} alt="logo" />
        </Link>
        <Menu>
          <ToggleWrapper>
            <IconRail theme={theme}>
              <FiSun onClick={toggleTheme} />
              <FiMoon onClick={toggleTheme} />
            </IconRail>
          </ToggleWrapper>
          <Link to="/series">
            <FiFolder />
          </Link>
        </Menu>
      </Inner>
    </HeaderWrapper>
  );
};

export default Header;
