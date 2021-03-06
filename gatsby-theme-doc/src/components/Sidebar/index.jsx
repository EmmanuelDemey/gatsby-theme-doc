import React from "react"
import Popup from "reactjs-popup"
import { StaticQuery, graphql } from "gatsby"
import { BurgerIcon, normalizeRoutes, Menu } from "./Utils"

import "./index.css"

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "auto",
  border: "none",
  overflow: "scroll",
}

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      {
        allDemoJson {
          edges {
            node {
              id
              basePath
              docs {
                id
              }
            }
          }
        }
        allMdx {
          edges {
            node {
              id
              frontmatter {
                id
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx, allDemoJson }) => {
      const frontmatters = allMdx.edges.map(
        ({ node: { frontmatter } }) => frontmatter
      )
      const { docs, basePath } = allDemoJson.edges[0].node

      const routes = normalizeRoutes(docs, frontmatters, basePath)
      return (
        <>
          <div className="sidebar website-sidebar" key="SW">
            <div className="sticky-sidebar">
              <Menu routes={routes} />
            </div>
          </div>
          <div className="sidebar mobile-sidebar" key="SM">
            <Popup
              modal
              overlayStyle={{ background: "rgba(255,255,255,0.98" }}
              contentStyle={contentStyle}
              closeOnDocumentClick={false}
              lockScroll
              trigger={open => <BurgerIcon open={open} />}
            >
              {close => <Menu close={close} routes={routes} />}
            </Popup>
          </div>
        </>
      )
    }}
  />
)

export default Sidebar
