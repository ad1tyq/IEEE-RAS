  /**
   * Static data array containing sponsor information
   * Each sponsor object includes:
   * - id: Unique identifier for React key prop
   * - name: Company or organization name
   * - logo: Logo image path (placeholder images)
   * - description: Detailed company description and involvement
   * - color: Theme color for visual distinction ('purple' or 'cyan')
   * - linkedinUrl: Company LinkedIn page URL (to be provided later)
   * 
   * All sponsors have equal visual prominence without tier distinctions
   */
export const sponsors = [
    {
      id: 1,
      name: "KDK Software",
      logo: "/images/logos/kdk-logo.png",
      description: "KDK Software, founded in 2006 and based in Jaipur, is a leader in tax‑compliance software. Their flagship product, Spectrum, supports compliance for income tax, TDS, and GST with over 150,000 users and more than 6 million ITRs filed annually. Known for empowering tax professionals and SMEs.",
      color: "purple",
      website: "https://www.kdksoftware.com",
      linkedinUrl: "https://www.linkedin.com/company/kdksoftwareindia/?originalSubdomain=in"
    },
    {
      id: 2,
      name: "Coding Blocks",
      logo: "/images/logos/coding-blocks-logo.png",
      description: "Coding Blocks is a premier Indian coding bootcamp founded by IIT alumni. They offer immersive, live classes in topics like web development, data structures, algorithms, ML, and competitive programming—serving over 100,000 learners across classroom and online platforms. Their goal: nurture job-ready developers through hands-on learning.",
      color: "cyan",
      website: "https://www.codingblocks.com/",
      linkedinUrl: "https://www.linkedin.com/school/codingblocksindia/?originalSubdomain=in"
    }
  ];
