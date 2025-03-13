import React from "react";
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import "./Footer.css";
const AppFooter = () => {
  return (
    <Footer
    style={{ backgroundColor: "var(--primary)", color: "var(--text-light)" }}
      columns={[
        {
          title: 'Resources',
          items: [
            { title: 'Face Recognition', url: '/face-recognition' },
            { title: 'Remote Access', url: '/remote-access' },
            { title: 'Lecture Attendance', url: '/lecture-attendance' },
          ],
        },
        
        {
          title: 'Help',
          items: [
            { title: 'About us', url: '/aboutus' },
            { title: 'Contact Us', url: '/contact' },
          ],
        },
      ]}
      bottom={<span>© 2025 IntellClass. All Rights Reserved</span>}
    />
  );
};

export default AppFooter;