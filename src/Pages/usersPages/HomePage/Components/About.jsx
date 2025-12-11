
const About = () => {
    return (
        <div id='about'>
            <div className='container pb-10'>
                <div className='flex flex-col gap-[24px]'>
                    <div>
                        <h2 className='text-[48px] font-bold'>About</h2>
                    </div>
                    <div>
                        <p>If you ask us to best describe Paragon, we would just turn the volume up and play the classic " this is a man's world " Be confident to enjoy your comfort zone wrapped with our hospitality while our masters would style your daily neat look at Paragon. And if once and always, you suddenly decide to strive for a different image just let our professionals know and they’ll offer a vast spectrum of solutions in line with the current trends. Be sure that our high end staff would help your bold personality in creating the best fit for your new look, the very look you wanted the world to see you.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.061931327067!2d44.50798047636089!3d40.1854351696838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abdff0c70ae2d%3A0x2f56c9254bdc60cc!2sParagon!5e0!3m2!1sru!2sam!4v1764938077719!5m2!1sru!2sam" width="600" height="500" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <div className='flex  items-center gap-1'>
                            <p className='text-[24px]'>Gazar Parpetsi St, Yerevan</p>
                            <a href="https://www.google.com/maps?daddr=+9+Ghazar+Parpetsi+St,+8,+Yerevan,+0002" className='text-[24px] text-purple-950'>Get Direction</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About