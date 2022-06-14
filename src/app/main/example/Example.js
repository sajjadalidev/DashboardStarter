import DemoContent from "@fuse/core/DemoContent";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";

const Root = styled(FusePageSimple)({
  "& .FusePageSimple-header": {},
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
});

function ExamplePage(props) {
  return (
    <Root
      content={
        <div className="p-24">
          <br />
          <DemoContent />
        </div>
      }
    />
  );
}

export default ExamplePage;
