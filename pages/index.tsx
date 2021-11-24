import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.sass'

import React from 'react'
import Web3 from "web3"
import Web3Modal from "web3modal"

const Home: NextPage = () => {

  // ---------- MAIN WALLET CONNECT LOGIC ----------

  const [web3, setWeb3] = React.useState<Web3>()
  const [provider, setProvider] = React.useState()
  const [account, setAccount] = React.useState("")

  const connect = React.useCallback(async () => {
    const providerOptions = {}
    const web3Modal = new Web3Modal({
      providerOptions // required
    })
    setProvider(await web3Modal.connect())
  }, [])

  React.useEffect(() => {
    console.log(provider)
    const web3Init = async () => {
      if (provider != undefined) {
        setWeb3(new Web3(provider))
        // @notice for some reason provider shows up as never
        // @ts-ignore
        setAccount(provider.selectedAddress)
      }
    }

    web3Init()
  }, [provider])

  // ---------- END OF WALLET CONNECT LOGIC ----------

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet Template</title>
        <meta name="description" content="Welcome to wallet template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.title}>
          Welcome to <span className={styles.highlight}> Wallet Template</span>
        </div>
        {account != undefined && account.length > 0 ? (
          <div className={styles.description}>
            You wallet address is <b><i>{account.slice(0, 6) + "..." + account.slice(-5, -1)}</i></b>
          </div>
        ) : (
          <div className={styles.description}>
            This is a template for a <b><i>web3</i></b> wallet application.
          </div>
        )
        }
        {/* Button to open wallet */}
        <div className={styles.button} onClick={connect}>
          Connect to wallet
        </div>
      </div>
    </div>
  )
}

export default Home
