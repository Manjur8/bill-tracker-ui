import { Skeleton } from 'antd'
import React from 'react'

const ApartmentCardLoader = ({numberofCards = 3}: {numberofCards?: number}) => {
  return (
    <div>
      {
        new Array(numberofCards).fill(null)?.map((i, index) => (
            <Skeleton.Node key={index}
                      active={true}
                      style={{
                        width: 280,
                        height: 120,
                        margin: '8px'
                      }}
                    />
        ))
      }
    </div>
  )
}

export default ApartmentCardLoader