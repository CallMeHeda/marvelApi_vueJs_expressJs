<template>
    <footer ref="footer">
        <div>
            <p>Copyright © 2022 <a href="https://fatimaelamri.tk">&nbsp;Fatima</a>. All Right Reserved.</p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
// footer {
//     display: flex;
//     justify-content: center;
//     color: rgb(24, 23, 23);
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     height: 2.5rem;

//     a {
//         color: rgb(24, 23, 23);

//         &:hover {
//             color: #eee3e3
//         }
//     }

// }
footer {
    display: flex;
    align-self: center;
    margin-top: auto;
    padding: 10px;
    p{
        color: rgb(24, 23, 23);

        a {
        color: rgb(24, 23, 23);

        &:hover {
            color: #eee3e3
        }
    }
    }
}
</style>