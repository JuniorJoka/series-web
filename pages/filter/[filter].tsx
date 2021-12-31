import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

import { Card } from "../../components/Card";
import { Loader } from "../../components/Loader";
import { Meta } from "../../components/Meta";
import { CardProps } from "../../shared/constants/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get(`${process.env.BACKEND_HOST}filter/${context.params.filter}`);
  return {
    props: {
      filter: context.params.filter,
      data: response.data.data,
    },
  };
};

export default function Filter({ filter, data }: { data: [CardProps]; filter: string }) {
  const metaImage = data[Math.floor(Math.random() * data.length)].imageSrc;

  const [cursor, setCursor] = React.useState(data.length);
  const [series, setSeries] = React.useState<any>(data);

  const updater = (data) => {
    if (data) {
      const newSeries = series.concat(data);
      setCursor(newSeries.length);
      setSeries(newSeries);
    }
  };

  const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}filter/${filter}/${cursor}`;

  return (
    <>
      <Meta
        title={`Filter - ${filter}`}
        description="Download the best of tv series in high Quality hd"
        keywords={`${filter}, ${filter} series`}
        image={metaImage}
      />

      {series.map((info) => (
        <Card key={info.title} {...info} />
      ))}
      <Loader url={url} handler={updater} />
    </>
  );
}
