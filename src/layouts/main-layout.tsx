import './main-layout.css!';
import * as React from 'react';
import { LayoutTopNav, LayoutTopNavLink } from './components/layout-top-nav';
import { LayoutHeader } from './components/layout-header';
import { LayoutMain } from './components/layout-main';
import { LayoutFooter } from './components/layout-footer';

export class MainLayout extends React.Component<{}, {}> {
  render() {
    const {children} = this.props;

    return (
      <div className="c-text">
        <LayoutHeader>
          <LayoutTopNav>
            <LayoutTopNavLink href="/" isPrimary> Top photos </LayoutTopNavLink>
            <LayoutTopNavLink href="/favourite"> Favourite photos </LayoutTopNavLink>
          </LayoutTopNav>
        </LayoutHeader>

        <LayoutMain>
          {children}
        </LayoutMain>

        <LayoutFooter>
          {/* your footer */}
        </LayoutFooter>
      </div>
    );
  };
};
