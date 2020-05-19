import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const features = [
  {
    title: <>TypeScript</>,
    description: (
      <>
        默认使用<strong>TypeScript</strong>，提供良好的开发体验
      </>
    ),
  },
  {
    title: <>Dependency Injection</>,
    description: <>使用依赖注入组织代码，易于写出可维护性、可读性、可测试性的代码</>,
  },
  {
    title: <>Extensible</>,
    description: <>强大的插件机制，让框架灵活、易于扩展</>,
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <ul className="feature">
            <li>
              <a href="https://github.com/koajs/koa" target="_blank">
                Koa
              </a>
            </li>
            <li>
              <a href="https://www.typescriptlang.org/" target="_blank">
                TypeScript
              </a>
            </li>
            <li>
              <a href="/docs/basic/controller" target="_blank">
                Restful
              </a>
            </li>
            <li>
              <a href="/docs/basic/graphql" target="_blank">
                GraphQL
              </a>
            </li>
            <li>
              <a href="/docs/basic/provider" target="_blank">
                Dependency Injection
              </a>
            </li>
            <li>
              <a href="/docs/basic/middleware" target="_blank">
                Middleware
              </a>
            </li>
            <li>
              <a href="/docs/basic/plugin" target="_blank">
                Plugin
              </a>
            </li>
          </ul>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('/docs/intro/quick-start')}
            >
              快速开始
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
