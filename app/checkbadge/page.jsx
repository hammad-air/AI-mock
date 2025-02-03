import React from 'react'

import AwardBadge from "./_components/AwardBadge"


import BadgeList from "./_components/BadgeList"



const page = () => {
  const userEmail = "example@hg.com"; 
  return (
    <div><AwardBadge/>
      <BadgeList userEmail={userEmail} />
    '</div>
  
  )
}

export default page