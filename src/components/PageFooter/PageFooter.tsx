import { FC } from "react";
import PageContainer from "../PageContainer/PageContainer";
import styles from "./PageFooter.module.css";

const PageFooter: FC = () => {
  const YEAR = new Date().getFullYear();

  return (
    <PageContainer className={styles.root}>
      <p>
        THE SOFTWARE IS&nbsp;PROVIDED &laquo;AS&nbsp;IS&raquo;, WITHOUT WARRANTY
        OF&nbsp;ANY KIND, EXPRESS OR&nbsp;IMPLIED, INCLUDING BUT NOT LIMITED
        TO&nbsp;THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A&nbsp;PARTICULAR
        PURPOSE AND NONINFRINGEMENT. IN&nbsp;NO&nbsp;EVENT SHALL&nbsp;THE
        AUTHORS OR&nbsp;COPYRIGHT HOLDERS BE&nbsp;LIABLE FOR ANY CLAIM, DAMAGES
        OR&nbsp;OTHER LIABILITY, WHETHER IN&nbsp;AN&nbsp;ACTION
        OF&nbsp;CONTRACT, TORT OR&nbsp;OTHERWISE, ARISING FROM, OUT
        OF&nbsp;OR&nbsp;IN&nbsp;CONNECTION WITH THE SOFTWARE OR&nbsp;THE USE
        OR&nbsp;OTHER DEALINGS IN&nbsp;THE SOFTWARE.
      </p>

      <p>MIT License Copyright&nbsp;&copy; {YEAR}</p>
    </PageContainer>
  );
};

export default PageFooter;
