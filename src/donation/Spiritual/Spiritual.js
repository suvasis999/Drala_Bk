import React, { useEffect } from 'react';
import './Spiritual.css';
const Spiritual = ({setStateOnParent}) => {
  const [isAgreedOnTerms, setIsAgreedOnTerm ] = React.useState( false );
  const handleInput = () => { 
      setIsAgreedOnTerm(prevState => !prevState );
  }

  useEffect( ()=>{
    setStateOnParent(isAgreedOnTerms);
  },[isAgreedOnTerms]
  )
  return (
    <div className='inner_spiritual'>
      <div className='aboutSpiritual'>
        <h2>About Spiritual Adoption</h2>
        <div className='Spiritual_paragraph'>
          <p>
            Spirit of Truth Native American Church's Constitution limits
            membership in the Church to those who have been duly adopted by the
            President of the Church. This adoption is an ancient principle and
            Ceremony called "Making Relations." The Ceremony involves two parts:
            1) that you perform by you in your location; and 2) which the
            President of the Church performs at his/her location.
          </p>
          <p>
            The Church allows individuals to exercise the freedom the Creator
            has given them to follow the dictates of religion according to how
            they feel directed by the Spirit. However, the Church does restrict
            membership to individuals at the age of accountability, that age
            being eight years old, and to those who feel called by the Creator
            to become a Healer, which are also called Medicine Men and Medicine
            Women. To be established as a Healer/Medicine Person, one must place
            themselves in one or more of the categories below.
          </p>
          <p>
            1)
            <span>As a Healer of people or animas.</span>
            These are Medicine Men and Women of the Church whose focus is on
            relieving the suffering of people or animals.
          </p>
          <p>
            2)
            <span>As a Healer of the family unit.</span>
            These are Medicine Men and Women of the Church who focus their
            ceremonial healing on family issues and in healing the values of
            family life.
          </p>
          <p>
            4)
            <span>As a Healer of Society.</span>
            These are Medicine Men and Women of the Church that focus on
            repairing social systems or situations.
          </p>
          <p>
            5)
            <span>As a Healer of the Planet.</span>
            These are Medicine Men and Women of the Church whose focus is on
            restoring sustainable care of our Earth Mother and educating others
            in the responsible use of her resources.
          </p>
          <p>
            Membership in the Spirit of Truth Native American Church is
            permanent, meaning once an individual is a member of the Church
            Family, they can only be removed by their request or by a serious
            infraction against the Church's Constitution or Ethical Code of
            Conduct. This practice of "Making Relations" or "Spiritual Adoption"
            is an ancient religious practice and should be taken seriously. This
            is the same principle that that Chief Joseph became Chief of the Nez
            Perce People, even though by today's accepted or legal standards, he
            could not be considered Nez Perce. Because of this ancient practice,
            Chief Joseph's signature was accepted as authoritative by the United
            States Federal Government in the Nez Perce Treaty.
          </p>
          <p>
            There are many benefits, including legal ones, in becoming
            Spiritually Adopted, and any person of any ethnic background may
            request adoption if they have sincerity of belief. To be a "Member
            of Good Standing", one must be willing to make the following
            Declarations of Intention, as Covenant Obligations, which are
            described in the following:
          </p>
          <div className='check_spiritual'>
            <input onChange={ handleInput } type='checkbox' name='spiritual' id='' required />
            <label for='spiritual'>
              {' '}
              I agree to be true to the Declarations and can place myseif in at
              least one category above.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spiritual;
