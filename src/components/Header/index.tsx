import useScrollPosition from '@react-hook/window-scroll'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Text } from 'rebass/styled-components'
import { darken } from 'polished'
import styled from 'styled-components'
import LogoDark from '../../assets/svg/logo_white.svg'
import Menu from '../Menu'
import Row, { RowFixed, RowBetween } from '../Row'
import SearchSmall from 'components/Search'
import NetworkDropdown from 'components/Menu/NetworkDropdown'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { networkPrefix } from 'utils/networkPrefix'
import { AutoColumn } from 'components/Column'
import { useActiveWeb3React } from 'hooks'
import { useETHBalances } from 'state/wallet/hooks'
import Web3Status from 'components/Web3Status'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 48px 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 36px 1fr;
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  @media (max-width: 1080px) {
    display: none;
  }
`

const HeaderRow = styled(RowFixed)`
  @media (max-width: 1080px) {
    width: 100%;
  }
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  @media (max-width: 1080px) {
    padding: 0.5rem;
    justify-content: flex-end;
  } ;
`

const Title = styled(NavLink)`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  :hover {
    cursor: pointer;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  margin: 0 6px;
  padding: 8px 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const SmallContentGrouping = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 1080px) {
    display: initial;
  }
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg1)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export default function Header() {
  const { account } = useActiveWeb3React()
  const [activeNewtork] = useActiveNetworkVersion()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const scrollY = useScrollPosition()

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <HeaderRow>
        <Title to={networkPrefix(activeNewtork)}>
          <UniIcon>
            <img width={'24px'} src={LogoDark} alt="logo" />
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyledNavLink id={`accounts-nav-link`} to={networkPrefix(activeNewtork) + 'accounts'}>
            Accounts
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={networkPrefix(activeNewtork)}
            isActive={(match, { pathname }) => pathname === '/'}
          >
            Overview
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`} to={networkPrefix(activeNewtork) + 'pools'}>
            Pools
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`} to={networkPrefix(activeNewtork) + 'tokens'}>
            Tokens
          </StyledNavLink>
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <NetworkDropdown />
        <SearchSmall />
        <HeaderElement>
          <AccountElement active={!!account}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0, userSelect: 'none' }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                <div>{userEthBalance?.toSignificant(3)} ETH</div>
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <Menu />
      </HeaderControls>
      <SmallContentGrouping>
        <AutoColumn gap="sm">
          <RowBetween>
            <NetworkDropdown />
            <Menu />
          </RowBetween>
          <SearchSmall />
        </AutoColumn>
      </SmallContentGrouping>
    </HeaderFrame>
  )
}
