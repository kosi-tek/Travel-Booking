<template>
    <div class="px-4 py-16 mx-auto sm:max-w-xl bg-gray-800 md:max-w-full  md:px-24 lg:px-8 lg:py-20" style="background-image: '); background-size: cover; background-position: center;width: 100%;back ">
        <h2 class="mb-8 text-3xl font-bold text-center text-white">Meet Your Transport</h2>
        <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center justify-center p-8 border-b sm:border-r image-box-1 hover-animation">
                <h6 class="mb-2 font-extrabold text-2xl text-blue-500 leading-5">Bus</h6>
            </div>
            <div class="flex flex-col items-center justify-center p-8 border-b lg:border-r image-box-2 hover-animation">
                <h6 class="mb-2 font-bold text-2xl text-blue-500 leading-5">Luxurious Bus</h6>
            </div>
            <div class="flex flex-col items-center justify-center p-8 border-b lg:border-r image-box-3 hover-animation">
                <h6 class="mb-2 font-bold text-2xl text-blue-500 leading-5 bg-opacity-30">Travel Car</h6>
            </div>
        </div>
    </div>
</template>

<style>
.image-box-1 {
    border-radius: 5%;
    background-image: url('https://i.pinimg.com/236x/11/07/d4/1107d4ca78610f12d5f925a54fd4aef3.jpg');
    background-size: cover;
    background-position: center;
    height: 300px;
    width: 90%;
    transition: transform 0.5s;
}

.image-box-2 {
    border-radius: 5%;
    background-image: url('https://img.freepik.com/free-photo/group-buses-driving-along-road-sunset_157027-4307.jpg?t=st=1713785336~exp=1713788936~hmac=389e46e2482128c444b5cb62ec2f8446fc7cd976c62048c0bff2d27a1bf2f4d0&w=826');
    background-size: cover;
    background-position: center;
    height: 300px;
    width: 90%;
    transition: transform 0.5s;
}
.image-box-3 {
    border-radius: 5%;
    background-image: url('https://img.freepik.com/free-photo/close-up-packed-car-traveling_23-2151030913.jpg?size=626&ext=jpg&ga=GA1.1.632608903.1713783090&semt=ais');
    background-size: cover;
    background-position: center;
    height: 300px;
    width: 90%;
    transition: transform 0.5s;
}

.hover-animation:hover {
    transform: scale(1.05);
}

.image-box h6 {
    text-align: center;
}
</style>
