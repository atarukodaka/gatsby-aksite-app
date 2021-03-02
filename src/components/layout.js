import React from "react"

//import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Sidebar from './sidebar.js'
import { graphql, useStaticQuery, Link } from "gatsby"
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import { Drawer, IconButton, Divider } from '@material-ui/core'
//import { TwitterIcon } from 'react-share'
import SEO from './seo'
//import Typography from '@material-ui/core/Typography'
import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'
import Tree from './tree'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import GoogleSearch from './google_search'

import styles from './layout.module.css'

const theme = createMuiTheme({  // #1
    palette: {
        primary: {
            light: '#ffff8b',
            main: '#222277',
            dark: '#c9bc1f',
            contrastText: '#ffffff',

        }
    },
})
const query = graphql`
{
    site {
        siteMetadata {
            title
            author
            description
            social { twitter }
        }
    }
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
                        <GoogleSearch />
                        <h3>Directories</h3>
                        <DirectoryArchives />
                        <Divider />
                        <h3>Monthly</h3>
                        <MonthlyArchives />
                    </nav>
                </div>
            </Drawer>

            <div className={styles.title}>
                <Container>
                    <h1><Link to="/">{siteTitle}</Link></h1>
                    <h3>{siteDescription}</h3>
                </Container>
            </div>
        </header>
    )
}

const BottomPane = ({ author }) => (
    <footer className={styles.bottomPane}>
        (C) Copyright {(new Date()).getFullYear()} {author} All Right Reserved.
                Powered by <a href="https://www.gatsbyjs.com/">Gatsby</a>
                and <a href="https://github.com/atarukodaka/gatsby-aksite-starter">AK site starter</a>.
    </footer>
)

const TableOfContents = ({ items }) => (
    <div className={styles.tableOfContents}>
        <h3>Table of Contents</h3>
        <Tree items={items || []} />
    </div>
)

const MiddlePane = ({ children, tableOfContents }) => (
    <div className={styles.middlePane}>
        <Container className={styles.middlePane}>
            <Grid container spacing={3}>
                <Hidden smDown>
                    <Grid item md={3} xs={false}>
                        <div className={styles.sidebar}>
                            <Sidebar />
                        </div>
                    </Grid>
                </Hidden>

                <Grid item md={6} xs={12}>
                    {children}
                </Grid>

                <Grid item md={3} xs={12}>
                    <GoogleSearch/>
                    {tableOfContents && (<TableOfContents items={tableOfContents.items} />)}
                </Grid>

            </Grid>
        </Container>
    </div>
)

const Layout = ({ children, title, description, image, tableOfContents }) => {
    const data = useStaticQuery(query)
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const author = data.site.siteMetadata.author

    if (description === undefined) { description = siteDescription }

    return (
        <MuiThemeProvider theme={theme}>
            <SEO title={`${title} | ${siteTitle}`} description={description} image={image} lang="ja" />
            <TopPane siteTitle={siteTitle} siteDescription={siteDescription} />
            <MiddlePane tableOfContents={tableOfContents}>{children}</MiddlePane>
            <BottomPane author={author} social={data.site.siteMetadata.social} />
        </MuiThemeProvider>
    )
}
export default Layout
