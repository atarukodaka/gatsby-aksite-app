import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import { Drawer, IconButton, Divider } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { css } from '@emotion/react'

import MonthlyArchives from './MonthlyArchives'
import DirectoryTree from './DirectoryTree'
import SEO from './SEO'
import GoogleSearch from './GoogleSearch'
import Sidebar from './Sidebar'
//import useSiteInformation from '../hooks/use_site_information'

//import styles from './layout.module.css'

const theme = createMuiTheme({  // #1
    palette: {
        /* type: 'dark', */
        
        primary: {
            light: '#ffff8b',
            main: '#222277',
            dark: '#c9bc1f',
            contrastText: '#ffffff',

        }
        
    },
})

////////////////////////////////////////////////////////////////
// Top
const cssSiteTitle = css`
    padding-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid #111; 

    h1 { font-size: 4rem; }
    a { 
        text-decoration: none;
        color: black;
    }
`
const TopPane = ({ siteTitle, siteDescription }) => {
    //const data = useStaticQuery(query)
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const gcse_cx = process.env.GCSE_CX

    return (
        <header>
            <AppBar position="relative">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton onClick={handleDrawerOpen} color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    <Button color="inherit" component={Link} to="/">{siteTitle}</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                </Toolbar>
            </AppBar>

            <Drawer open={open}>
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                    <Divider />

                    <nav>
                        <GoogleSearch cx={gcse_cx}/>
                        <h3>Directories</h3>
                        <DirectoryTree />
                        <Divider />
                        <h3>Monthly</h3>
                        <MonthlyArchives />
                    </nav>
                </div>
            </Drawer>

            <div css={cssSiteTitle}>
                <Container>
                    <Link to="/">
                        <h1>{siteTitle}</h1>
                        <h3>{siteDescription}</h3>
                    </Link>
                </Container>
            </div>
        </header>
    )
}

////////////////////////////////////////////////////////////////
// Middle

const cssMiddlePane = css`
    margin-top: 2rem;
`
const cssTableOfContents = css`
    position: sticky;
    top: 0;
    li {
        /* font-size: 0.8rem; */
        a { text-decoration: none; }
    }
`
const cssSidebar = css`
    margin-right: 2rem;
    /* font-size: 0.8rem; */
`

const Tree = ({ items }) => (
    <ol>
        {
            items.map(v => (
                <li key={v.url}>
                    <Link to={v.url}>{v.title}</Link>
                    {v.items && (<Tree items={v.items} />)}
                </li>
            ))
        }
    </ol>
)

const TableOfContents = ({ items }) => (
    <div css={cssTableOfContents}>
        <h3>Table of Contents</h3>
        <Tree items={items || []} />
    </div>
)

const MiddlePane = ({ children, tableOfContents }) => (
    <div css={cssMiddlePane}>
        <Container>
            <Grid container spacing={3}>
                <Hidden smDown>
                    <Grid item md={3} xs={false}>
                        <div css={cssSidebar}>
                            <Sidebar />
                        </div>
                    </Grid>
                </Hidden>

                <Grid item md={6} xs={12}>
                    {children}
                </Grid>

                <Hidden smDown>
                    <Grid item md={3} xs={12}>
                        <GoogleSearch cx={process.env.GCSE_CX}/>
                        {tableOfContents && (<TableOfContents items={tableOfContents.items} />)}
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    </div>
)

////////////////////////////////////////////////////////////////
// Bottom

const cssBottomPane = css`
    border-top: 2px solid #111;
    margin-top: 1em;
    padding: 1em;
`
const BottomPane = ({ author }) => (
    <footer css={cssBottomPane}>
        (C) Copyright {(new Date()).getFullYear()} {author} All Right Reserved.
                Powered by <a href="https://www.gatsbyjs.com/">Gatsby</a>
                and <a href="https://github.com/atarukodaka/gatsby-aksite-starter">AK site starter</a>.
    </footer>
)

////////////////////////////////////////////////////////////////
// Layout
const Layout = ({ children, title, description, image, tableOfContents }) => {
    const query = graphql`
    {
        site {
            siteMetadata {
                siteTitle: title
                siteDescription: description
                author
                coverImage
                social { twitter, github }
            }
        }
    }
    `
    
    /*
    const { site }  = useStaticQuery(query)
    const { siteTitle, siteDescription, author, social } = site.siteMetadata
    */
    const { site: { siteMetadata: { siteTitle, siteDescription, author, social, coverImage }}} = 
        useStaticQuery(query)

    return (
        <MuiThemeProvider theme={theme}>
            <SEO title={`${title} | ${siteTitle}`} 
              description={description || siteDescription} image={coverImage} lang="ja" />
            <TopPane siteTitle={siteTitle} siteDescription={siteDescription} />
            <MiddlePane tableOfContents={tableOfContents}>{children}</MiddlePane>
            <BottomPane author={author} social={social} />
        </MuiThemeProvider>
    )
}
export default Layout
