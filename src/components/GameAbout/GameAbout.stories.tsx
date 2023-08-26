import React from 'react'

import GameAbout from '@/components/GameAbout/index'

export default {
  title: 'GameAbout',
  component: GameAbout
}

export const Default = () => (
  <GameAbout description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed" />
)

export const LongText = () => (
  <GameAbout
    description={
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut porttitor nisl, pulvinar mattis arcu. Nulla id augue at neque euismod rutrum ut id lorem. Maecenas blandit varius sem, at blandit ex commodo vitae. Mauris at nunc suscipit, rhoncus quam sit amet, vehicula tellus. Morbi in tempus lectus. Nulla tincidunt ante neque, dapibus ultrices elit aliquet a. Etiam cursus dolor ante, quis iaculis mi vehicula id. Etiam porta risus in leo fermentum, vitae tempus arcu convallis.\n' +
      '\n' +
      'Aliquam erat volutpat. Nunc pellentesque vel velit quis mollis. Nullam elementum varius leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus eu leo ullamcorper, faucibus mi faucibus, ornare purus. Praesent quis arcu in lacus varius sodales ut sed turpis. Etiam feugiat sem sit amet mi aliquet, id tempor justo egestas. Nam dui sapien, tincidunt finibus ultricies sit amet, hendrerit vel felis. Etiam dignissim egestas turpis, viverra vehicula massa sagittis id. Phasellus congue interdum dolor sit amet sollicitudin. In sed erat et odio egestas commodo. Suspendisse dictum turpis non eros efficitur euismod. Nunc vel lacus eu quam varius rhoncus id quis elit. Nam vitae vehicula nulla.\n' +
      '\n' +
      'Suspendisse at purus risus. Maecenas volutpat facilisis vehicula. Phasellus blandit mollis enim sit amet tincidunt. Sed nunc metus, aliquet in porttitor at, pulvinar eget magna. Aliquam erat volutpat. Sed sollicitudin mauris sed lacus efficitur pharetra. Fusce at rhoncus dui. Mauris elementum auctor nunc, in maximus purus finibus ultrices.\n' +
      '\n' +
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam a suscipit nulla, id tincidunt eros. Donec ullamcorper felis a placerat vestibulum. In hac habitasse platea dictumst. Praesent vulputate dictum malesuada. Nam vitae consectetur neque. Sed sed suscipit sapien. Etiam at pharetra nunc. Etiam aliquam bibendum venenatis. Vestibulum rhoncus purus et augue vestibulum ultricies. Morbi metus elit, aliquet vel metus sit amet, mollis blandit velit. Vestibulum fermentum eget nisi eu congue. Phasellus consectetur, sapien sit amet semper placerat, ex nunc rhoncus mi, sit amet iaculis quam orci non mauris. In pellentesque maximus sapien, nec convallis purus finibus id. Nam sollicitudin tempor nisl a finibus.\n' +
      '\n' +
      'Praesent eu odio lectus. Morbi posuere dolor a bibendum maximus. Integer eleifend nisi a scelerisque rhoncus. Quisque volutpat tellus leo. Morbi varius tellus ex, quis mattis justo efficitur eget. Nullam eu posuere nunc, vel suscipit diam. Vestibulum ut tortor viverra, vehicula nisl id, tempor felis. Donec in efficitur lacus. Phasellus bibendum facilisis augue sed blandit. Pellentesque consequat mauris eget tellus commodo, nec semper erat vehicula.\n' +
      '\n' +
      'Morbi consectetur, turpis quis iaculis elementum, justo eros semper magna, at venenatis ligula orci at arcu. Vivamus rutrum, nulla pharetra accumsan convallis, turpis ex malesuada erat, in viverra leo leo malesuada mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum vitae lobortis dui. Quisque eget posuere leo. Nam maximus elit sed urna venenatis varius. Maecenas vitae dignissim velit. Cras lacus mi, rutrum consectetur sapien at, efficitur eleifend tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n' +
      '\n' +
      'Etiam ac lectus nulla. Vivamus sit amet tellus vel augue commodo fringilla sed in purus. Suspendisse risus sem, feugiat blandit lacus a, suscipit ornare risus. Maecenas tincidunt quam et arcu auctor, vitae semper tellus sollicitudin. Pellentesque eleifend scelerisque sem, non interdum ex convallis et. Vivamus aliquet quis ante sed condimentum. Vivamus ligula libero, dignissim eget imperdiet egestas, sollicitudin tincidunt lorem. In nulla mauris, accumsan id euismod sagittis, blandit at risus.\n' +
      '\n' +
      'Praesent aliquet at orci et ullamcorper. Nullam sit amet viverra enim. Suspendisse aliquet, erat eget congue egestas, diam tellus egestas felis, vitae pharetra velit leo id lectus. Pellentesque commodo, enim volutpat consectetur egestas, sapien tellus tempor libero, vel tincidunt metus arcu eu libero. Duis nulla quam, ornare sed mi at, pretium sodales magna. Curabitur tortor ex, tristique viverra semper at, convallis ut risus. Nam id dictum dui. Duis porttitor felis sit amet tellus varius, vel eleifend nunc rhoncus. Aliquam volutpat arcu eu metus faucibus, in malesuada lacus porta. Maecenas efficitur nunc ipsum, varius sodales enim finibus ac. Vivamus faucibus in neque eget pellentesque. Donec quis lacus nisl. Donec vitae cursus lorem. Etiam aliquam quam bibendum, porta sem finibus, commodo ante.\n' +
      '\n' +
      'Pellentesque pellentesque enim quis mauris elementum sollicitudin. Sed pharetra ultrices posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse gravida laoreet mauris, quis hendrerit quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi sit amet feugiat quam, quis feugiat justo.\n' +
      '\n' +
      'Duis tristique neque eu est tincidunt, ac sodales elit luctus. Praesent eget euismod leo. Phasellus in tortor aliquet, maximus felis sit amet, feugiat nisi. Nulla ornare porta rhoncus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla mollis leo eu odio consectetur, a cursus nunc euismod. Sed porta leo lacus, sed tristique enim pharetra quis. Donec at nibh sit amet erat aliquet ullamcorper eu vitae dui.'
    }
  />
)
