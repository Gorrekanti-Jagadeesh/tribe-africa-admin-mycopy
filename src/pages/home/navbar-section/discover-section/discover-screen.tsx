import React, { useState } from 'react';

interface DiscoverProps {
  setParentContent: (value: boolean) => void;
}

const Innovations: React.FC<DiscoverProps> = ({ setParentContent }) => {
  const smartInnovation =
    'https://s3-alpha-sig.figma.com/img/2025/80e1/3c3b0ed9d628d74f53ece69e78e39ba5?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XlE5DRxoCZ1DrmNCcIK9Gn0-YQiAKoemz5PH3EMmWt1lvDmbP4klSIqxGiUF5KYyqwfAw61oEGGuVhH2vc4DKo5wNhSPQn6OcqxCty2S64rgmfmcZogBG9Yixb4AMFdgWRGHF6q8GQUfsrHjs~NqA7bWNhE0aQszkETQJoMSJa3VEgQmr2si2CIjUuO~AAMTJDQ3322YVjxePEciYijBblhRK4EKHFC31pCSwX1qebrBcLl9MwRR6OxNFgIWXHTGxakOrn5toi33y1DravP-Uaj-81yeoYpLp5V8wYjuXhgw8V5toS~YlXbVWlAydVyHf4b69sjpbax4dTYEhk1rkQ__';
  const smartCities =
    'https://s3-alpha-sig.figma.com/img/348a/7412/e5a8fe1716bfa42207b8b2f1d04eaab7?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bugjTBnT25V6dY6s9h66fyPgA3KTRPFVQPTcZVvLtLnqxENugQZOj~tuCpAUCQjxP7w9WjXt2bhxW1UTea9NSmqDpbuSS6zP9l4F6BMwdavandImGe-O1Z0NAiBspSOi8AACLX9okN2jsDgioCbqO5RSv9TVaQJrLC2DFHNr-Xb5pcH1ZK2RLdELVLRpOzHjaGREcheVIhWoMRkka-Niifx3A-L8n~fzprvDDhhguGTRP4AmjszCm~dKwAGeEq--OZD42RBWjUvRW6jc5y6vIasmfxXGxbpKx8eAyEUjTFbD1gqf2nxDsQgwQT4gKCGPFyYY1l9FZxoast5fEc1dKw__';

  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Innovations
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        <div className=" inline-block p-2 my-2">
          <div
            className="aspect-square bg-cover rounded-md"
            style={{
              width: '200px',
              backgroundImage: `url(${smartInnovation})`,
            }}
          ></div>
          <p className="text-left">Amazing Smart Innovations</p>
        </div>
        <div className=" inline-block p-2 my-2">
          <div
            className="aspect-square bg-cover rounded-md"
            style={{
              width: '200px',
              backgroundImage: `url(${smartCities})`,
            }}
          ></div>
          <p className="text-left">Upcoming Smart Cities</p>
        </div>
      </div>
    </div>
  );
};

const DidYouKnow: React.FC<DiscoverProps> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Did You know?
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const BucketList: React.FC<DiscoverProps> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Bucket List
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const GreatOutdoors: React.FC<DiscoverProps> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; The Great Outdoors
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const Pilgrimage: React.FC<DiscoverProps> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Pilgrimages
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const DestinationWedding: React.FC<DiscoverProps> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Wedding destinations
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const Discover = () => {
  const [content, setContent] = useState<React.ReactNode>();
  const [parentContent, setParentContent] = useState(true);

  // Images in the discover layout
  const innovationsView =
    'https://s3-alpha-sig.figma.com/img/94c5/9ee4/e853b13bc6b9adb50fbc2be5530b9d91?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NXvSZt9dm-7yHq6bPOjwk8oOYuu0PsCyFAvOY2TWGGbD5CQdeTdXsA7nwlFYRULqvoR4oaWvJqPNuggzkwt12KgZxxPmmc~uBYNwkA7Gk4tFDhLHYEtSbxHitVdIjW--GS0H-SzT~lJDRuUa5OND4K09WGPIAm070OsG6MFUkUymzp3OblRMQbTe9mfwwK4VuBP0nbbWSUsdapXbhyEUGB21BJrR9oLizc6Nh7FENBV27beTGyhk~mthzCu8Qm5AQQOF7hsYmbeqeNdvH~lVamZvbiyV09rH3xdu-gn1SNc5ET~e~aiXijKvEN5k4SH4PQMfUQSL5dl68qHfnXhJGw__';
  const DidYouKnowView =
    'https://s3-alpha-sig.figma.com/img/627c/24ec/9158502614e9cdec7c4654e128952eb3?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nLxqrNAICYfT1Nva531tzFp3T29nanzwX1Zj4W08kZqr46G3xIW5Xkk2Rh5TD6OlT1f55BISo5Q~ttICyPO~1y26TH6DWc0u~lf9f6Taf2G31mf4jGNXZVEvPzN0m5dhgFCS-3IBM9nU2xlHpc3vBE1ir3XdPydC96K7InD2wksakRR5dDTiF0KPXoZ2UunzgxZwntQvmJX7vbooqFZC~TCX99IAfPuDuocRusGJMo9CAGpKhNHCnFYer-bhkIhchYwsNS4~dU-h~lXCY3bU0IyhtuQp5kmfpCPGwqfuyKOugqBXPXhRq29VaFI1meqZKfXmCAe-zoROGJXp9VQrVA__';
  const BucketListView =
    'https://s3-alpha-sig.figma.com/img/eb53/5411/4b694cc740489fa64e9c6607420a6dbb?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eppVzVRQF~187MIZIweEbI-jiAX8f7tthKdbochK8AqxCesE1Kl1Hg7-5mWgOvOhkC28CzrvEVwo5t8ueVttmO4U1tlyNlX7cw9UQfQStVgfIL~nnouXAX3L5AFFAEWF8OFWE8RTfNIJD5EJvikBbMycZMlTylMOhL3d5hBSotRHfMZNNe~us0VOWQmKGL~10B4Csvi3FekXpQpyMkJT5JSizl19jCQKb4ZlTFxi1NsFkP~8UU-zrsTP2r0tdABjewO-~7bPXD22pDkjYDOpl6eveo6XjuhxfNN9JQVXirqwiPQlsLtcP9kHQSpNT0i4X0~6kPKgu5ebkI8NNukR1A__';
  const GreatOutdoorsView =
    'https://s3-alpha-sig.figma.com/img/59c6/d349/738c629dc6f58dc38c03225ed888ded7?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QJ88U17-fi3mhSWTkLbB52Bx8jOT9xycTEUMt3ZIyQvwkCOSq1cLVfKeuUVkKU1ozOY8OW0dursQ-o8D0rsDSwYUnCfhI20avWhZ9fxy0BKARSUylJWLK24ynxTLdIrINwAgX1FZhyLZ~Z4pyIalACVcEiGeGO09L6i1madd0~o5t2GUfmFrFnLpfJVu6QWLP8qLcHqNvGUSqgcf4FNC6Ne2GvnibJMi8THdeFIbqOZCwv5N6BbNzkGWOKqi2Nu3kB0jWA2hloTP8nuAKBNRmJuDw0fxu9DPO8ATf7kRQ4VMwTIupzOjql82t6gF7TCRC8Rn4WXFmsJo-fG3g~X-Qw__';
  const PilgrimageView =
    'https://s3-alpha-sig.figma.com/img/71d0/d973/33d9b2943da0e7efe7fa5d2062ef38ff?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LZyiv3xPsn6fuLCy6yDaFF6ucLoitLqkJnfLM4YSd3usX7ngDLOy~ROwsaG2pJuwnHJIKtgFKnrJZ9XWPO7jVWau650xWTD1hYY5gcvBzTLVWI3GmV0-kuNJQpE0eVB6EVgawUoCNVRCWK1AJrBY1qYSqQ54ve9trtN4K3N8WE0KPJHNbipnekDElrvixW0CYM-MkTsz70kluIYp3G40ALFZ2jM4WQpCZZcXDHou2XFovOp28-kngLaI0Azc7IJ-jCLEi5wpIqIV6Q9bskZqXZJkBFQWp3cDBm1bFSitG9rJ8dJdQ02EUjImHxtaR4UQYX6GoMrsxQSbYnVfUInTKg__';
  const WeddingDestinationView =
    'https://s3-alpha-sig.figma.com/img/beba/69aa/1d63f1ff87b166087bb69cc4dc9420b0?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LwhA9yHew-JneOONieZSF~VJsSyt8BLJ-rRu07fk-SrflhPC6fj7a6H~vQn7e7DcJxNbOuKW7Qb2LO4eXGrw7XbThkd4-mWCU9UoBKrgk70D~Zt5D4VfqP1GYOP81cN8Uq0kTIo46OZCeyXFJE0FWZ6s-7lk9mHGjtS8P8IZfyInnpqBBRClCMZvnEKCMPZxyFXkeVODLzL3k-2pFZheFbdF7j5jQNOmEW3cGeVOBQDe~6NZlxaPPFGN7WgWss3B7Wgu0LrSSTZjzKV9tOD5M0U8HrSkMXkM0h9P3itC6jcRohYF0tjgMG4yDzj11HLn7xUPiYPEANSIu0dMeVrk2g__';

  // Discover content rendering based on selection
  const handleClick = (jsx: React.ReactNode) => {
    setContent(jsx);
    setParentContent(false);
  };

  return (
    <div className=" p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
      {parentContent ? (
        <div id="grid-layout" className="grid grid-cols-3">
          {/* Innovations card */}
          <div
            className=" inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<Innovations setParentContent={setParentContent} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${innovationsView})`,
              }}
            ></div>
            <p className="text-left">Innovations</p>
          </div>
          {/* Did you know? card */}
          <div
            className=" inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<DidYouKnow setParentContent={setParentContent} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${DidYouKnowView})`,
              }}
            ></div>
            <p className="text-left">Did you know?</p>
          </div>
          {/* Bucket list card */}
          <div
            className=" inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<BucketList setParentContent={setParentContent} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${BucketListView})`,
              }}
            ></div>
            <p className="text-left">Fot the bucket list</p>
          </div>
          {/* The great outdoors */}
          <div
            className=" inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<GreatOutdoors setParentContent={setParentContent} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${GreatOutdoorsView})`,
              }}
            ></div>
            <p className="text-left">The Great Outdoors</p>
          </div>
          {/* Pilgrimage card */}
          <div
            className=" inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<Pilgrimage setParentContent={setParentContent} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${PilgrimageView})`,
              }}
            ></div>
            <p className="text-left">Pilgrimage</p>
          </div>
          {/* Wedding destinations */}
          <div
            className=" inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<DestinationWedding setParentContent={setParentContent} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${WeddingDestinationView})`,
              }}
            ></div>
            <p className="text-left">Destination Weddings</p>
          </div>
        </div>
      ) : (
        <div id="sub-layout" className="p-8 m-2 text-left bg-white text-black rounded-2xl">
          {content}
        </div>
      )}
    </div>
  );
};

export default Discover;
