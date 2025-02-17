import React, { useEffect } from 'react';
import { Chunker, Handler, Polisher, Previewer } from 'pagedjs'; // Import specific modules from Paged.js

function PrintDocument() {
    useEffect(() => {
        // let paged = new Previewer();
        // let DOMContent = document.querySelector('App');
        //
        // paged.preview(DOMContent, [process.env.PUBLIC_URL + "./css/print.css"], document.body).then((flow) => {
        //     console.log('Rendered', flow.total, 'pages.');
        // });

        let paged = new Previewer();
        let DOMContent = document.querySelector('App');

        paged.preview(DOMContent, [], document.body).then((flow) => {
            console.log('Rendered', flow.total, 'pages.');
        });
    }, []);

    return (<main className="App">
        <h1>This is a Sample Document</h1>
        <p>This is some sample content that we want to print.</p>
        <p>It can be multiple paragraphs, images, or any HTML elements.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis ullamcorper arcu. Praesent
            finibus eget dui et laoreet. Morbi vestibulum eu turpis ut placerat. Quisque in mi nec massa semper
            vestibulum sed vitae tortor. Nam nec tortor tincidunt, rhoncus enim eu, lobortis purus. Curabitur ut
            aliquam metus. Vivamus fringilla sapien a mi lacinia, nec semper nulla feugiat. Sed pretium tincidunt
            cursus. Aliquam pretium suscipit ligula id lacinia. Sed efficitur nunc sed eros imperdiet, dictum
            scelerisque velit dictum. Sed ac ex eu justo feugiat placerat.</p>

        <p> Praesent convallis nulla ac blandit lacinia. Duis fringilla consectetur nisi. Pellentesque porta,
            odio vel faucibus ultricies, neque diam blandit orci, sit amet elementum libero mauris sodales
            sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. In euismod, sapien eget
            rhoncus luctus, quam quam lacinia nunc, in vulputate elit nulla et ipsum. Phasellus convallis
            pellentesque massa, a vulputate mauris pellentesque malesuada. Nam tincidunt ultrices sapien vitae
            maximus. Praesent quam nisi, finibus quis magna sed, ullamcorper mattis eros. Nullam eu tincidunt
            metus. Aliquam ut faucibus magna. Praesent a nunc turpis. Orci varius natoque penatibus et magnis
            dis parturient montes, nascetur ridiculus mus.</p>
        <pre>
            {` 
ds
ds 
ds
ds 
ds
ds 
ds
ds 
ds
ds 
ds
ds 
ds
ds 
ds
ds 
`}
        </pre>
        <p> Aenean gravida lorem iaculis sapien tristique, dictum euismod libero blandit. Donec ac ultrices
            sem,
            tincidunt volutpat nunc. Morbi suscipit sem vitae tortor bibendum, sed dictum dui congue. Aenean
            vel
            pretium lorem. Aliquam eu maximus lacus, maximus condimentum ex. Morbi sapien tortor, elementum
            vel
            laoreet id, pulvinar at purus. Nulla mollis tincidunt lectus a convallis. Integer eros nulla,
            eleifend non blandit eget, tincidunt at diam. Sed eleifend leo eu nibh scelerisque luctus.
            Praesent
            ac nisi tristique, sagittis ligula vitae, ultrices massa. Nullam accumsan ligula at augue
            accumsan
            sodales.</p>

        <p> Suspendisse eget purus sit amet justo mattis porta sed nec metus. Nunc posuere vestibulum
            enim,
            ullamcorper posuere tellus mattis vitae. Aliquam est sapien, malesuada eu est id, consequat
            placerat
            orci. Integer sit amet lacus enim. Mauris non semper felis. Praesent ut suscipit lorem, ac
            lacinia
            lacus. Mauris sed nisi augue. Fusce vitae dolor faucibus, volutpat quam vitae, molestie
            elit.
            Quisque sagittis aliquet neque, in commodo nisi consectetur ac. Cras eu magna nec lacus
            blandit
            viverra vitae sed est. Curabitur ullamcorper quis nisi nec vestibulum. Praesent lacinia,
            dolor
            vitae
            iaculis iaculis, enim odio accumsan ex, nec pellentesque felis tortor eu felis. Duis
            scelerisque
            nisl sed blandit suscipit. Donec in eros arcu. Vestibulum non imperdiet nibh. Praesent et
            eros
            maximus, imperdiet sapien at, pulvinar purus.</p>

        <p> Nullam vitae varius eros, finibus eleifend quam. Pellentesque finibus lacus nec nunc
            pulvinar,
            at
            pretium libero dictum. Nullam imperdiet, risus sit amet bibendum sodales, massa metus
            iaculis
            velit,
            in mollis mauris neque nec lorem. Nunc venenatis, ex ut finibus feugiat, nibh turpis
            mollis
            neque,
            at euismod diam metus id ante. Fusce quis pretium diam. Nulla placerat maximus turpis eu
            suscipit.
            Morbi porttitor, nulla nec ultrices finibus, lectus diam tincidunt arcu, non placerat
            quam
            tortor
            eget dolor. Integer vel pellentesque justo, sit amet vehicula elit. Donec sed ex
            ullamcorper,
            ullamcorper urna in, scelerisque ipsum. Aliquam eget sem pellentesque, maximus massa
            suscipit,
            bibendum odio. Suspendisse pellentesque ornare sem, hendrerit sollicitudin metus rutrum
            quis.
            Maecenas ornare, enim a cursus suscipit, ex ante dictum erat, et pellentesque lectus
            nunc
            vel
            enim.
            Mauris augue elit, fringilla non accumsan vitae, pharetra non lectus. Quisque quis lorem
            ipsum.
            Nulla ante nibh, sodales sit amet mattis at, blandit eu eros.</p>
    </main>);
}

export default PrintDocument;

