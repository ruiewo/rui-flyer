import { TemplateElement } from "../Flyer/template";
import { Content, Layout } from "../Flyer/schema";

const titleData = {
  title: "rui flyer",
  subtitle: "flyer maker",
};

const titleTemplate: TemplateElement = {
  type: "flex",
  props: {
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "0 0.75rem",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  children: [
    {
      type: "text",
      props: {
        fontWeight: "bold",
        fontSize: "5rem",
      },
      children: { key: "title" },
    },
    {
      type: "text",
      props: {
        fontWeight: "bold",
        fontSize: "2rem",
      },
      children: { key: "subtitle" },
    },
  ],
};

const descriptionData = {
  title: "this is a sample data",
  subtitle: "subtitle",
  catchCopy: "catch copy",
};

const descriptionTemplate: TemplateElement = {
  type: "flex",
  props: {
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "0 0.75rem",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  children: [
    {
      type: "text",
      props: {
        fontWeight: "bold",
        fontSize: "2rem",
      },
      children: { key: "title" },
    },
    {
      type: "text",
      props: {
        fontWeight: "bold",
        fontSize: "2rem",
      },
      children: { key: "subtitle" },
    },
    {
      type: "text",
      props: {
        fontWeight: "bold",
        fontSize: "1rem",
      },
      children: { key: "catchCopy" },
    },
  ],
};

const linkData = {
  subtitle: "/////////////////////////////////////////",
  link: [
    {
      site: "site1",
      url: "url1",
    },
    {
      site: "site2",
      url: "https://rui-flyer.example",
    },
  ],
  catchCopy: "/////////////////////////////////////////",
};

const linkTemplate: TemplateElement = {
  type: "flex",
  props: {
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "0 0.75rem",
      justifyContent: "center",
    },
  },
  children: [
    {
      type: "text",
      props: {
        fontWeight: "bold",
      },
      children: { key: "subtitle" },
    },
    {
      type: "table",
      key: "link",
      children: [
        {
          type: "td",
          props: {
            style: {},
          },
          children: [
            {
              type: "text",
              props: {
                fontSize: "1rem",
                fontWeight: "bold",
              },
              children: { key: "site" },
            },
          ],
        },
        {
          type: "td",
          props: {
            style: {},
          },
          children: [
            {
              type: "text",
              props: {
                fontSize: "1rem",
                fontWeight: "bold",
              },
              children: { key: "url" },
            },
          ],
        },
      ],
    },
    {
      type: "text",
      props: {
        fontWeight: "bold",
      },
      children: { key: "catchCopy" },
    },
  ],
};

export const layout: Layout = {
  size: { width: "210mm", height: "297mm" },
  gridTemplate: `
      "logo title" 99mm
      "description faceLogo" 99mm
      "faceLogo2 links" 99mm
      / 105mm 105mm`,

  areas: [
    {
      id: "logo",
      text: "logo",
      type: "image",
    },
    {
      id: "faceLogo",
      text: "faceLogo",
      type: "image",
    },
    {
      id: "faceLogo2",
      text: "faceLogo2",
      type: "image",
    },
    { id: "title", text: "title", template: titleTemplate },
    { id: "description", text: "description", template: descriptionTemplate },
    { id: "links", text: "links", template: linkTemplate },
  ],
};

export const content: Content = {
  logo: {
    props: {
      style: {
        display: "grid",
        gridTemplate: '"area0" minmax(0, 1fr)\n/ minmax(0, 1fr)',
        padding: "0.25rem 0.75rem",
      },
      count: 1,
    },
    images: [
      {
        src: "/logo/logo.svg",
      },
    ],
  },
  faceLogo: {
    props: {
      style: {
        display: "grid",
        gridTemplate:
          '"area0 area2" minmax(0, 1fr)\n"area1 area2" minmax(0, 1fr)\n/ minmax(0, 1fr) minmax(0, 1fr)',
        padding: "0.25rem 0.75rem",
      },
      count: 3,
    },
    images: [
      { src: "/logo/logo_face.svg" },
      { src: "/logo/logo_face2.svg" },
      { src: "/logo/logo_face.svg" },
    ],
  },
  faceLogo2: {
    props: {
      style: {
        display: "grid",
        gridTemplate:
          '"area0 area2" minmax(0, 1fr)\n"area1 area2" minmax(0, 1fr)\n/ minmax(0, 1fr) minmax(0, 1fr)',
        padding: "0.25rem 0.75rem",
      },
      count: 3,
    },
    images: [
      { src: "/logo/logo_face.svg" },
      {
        src: "/logo/logo_face2.svg",
      },
      { src: "/logo/logo.svg" },
    ],
  },
  title: titleData,
  description: descriptionData,
  links: linkData,
};
