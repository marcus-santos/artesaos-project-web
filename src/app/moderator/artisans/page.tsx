import React from 'react'
import ModeratorHeader from '../components/ModeratorHeader'
import ModeratorTitle from '../components/ModeratorTitle'
import Footer from '@/components/Footer'
import ModeratorSearch from '../components/ModeratorSearch'


function page() {
  return (
    <>
      <ModeratorHeader />
      <ModeratorTitle title={'Artesãos'} />
      <ModeratorSearch/>
    </>
  )
}

export default page